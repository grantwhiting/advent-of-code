const fs = require("fs");
const rockPaths = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n")
  .map((rp) => rp.split("->").map((p) => p.split(",").map(Number)))
  .flatMap((p) => {
    return p
      .map((n, i) => {
        if (p[i + 1] === undefined) return;
        const x1 = n[0];
        const x2 = p[i + 1][0];
        const y1 = n[1];
        const y2 = p[i + 1][1];

        let startX, endX, startY, endY;

        if (x1 === x2) {
          startX = x1;
          endX = x1;
        } else {
          startX = Math.min(x1, x2);
          endX = Math.max(x1, x2);
        }

        if (y1 === y2) {
          startY = y1;
          endY = y1;
        } else {
          startY = Math.min(y1, y2);
          endY = Math.max(y1, y2);
        }

        function getRange(lowEnd, highEnd) {
          const list = [];
          for (let i = lowEnd; i <= highEnd; i++) {
            list.push(i);
          }
          return list;
        }

        return {
          x: getRange(startX, endX),
          y: getRange(startY, endY),
        };
      })
      .filter((x) => x !== undefined)
      .flatMap((p) => {
        if (p.x.length > 1) {
          return p.x.map((x) => [x, p.y[0]]);
        }
        return p.y.map((y) => [p.x[0], y]);
      });
  });

let restfulSand = 0;

// create graph
const leftBound = Math.min(...rockPaths.map((x) => x[0]));
const rightBound = Math.max(...rockPaths.map((x) => x[0]));
const bottomBound = Math.max(...rockPaths.map((y) => y[1]));

const graph = Array.from(Array(bottomBound + 1), () =>
  Array(rightBound + 1).fill(".")
);

rockPaths.forEach((rp) => {
  graph[rp[1]][rp[0]] = "#";
});

function fallingSand(x, y) {
  while (graph[y + 1] !== undefined && graph[y + 1][x + 1] !== undefined) {
    if (graph[y + 1][x] === ".") {
      y++;
      continue;
    } else if (graph[y + 1][x - 1] === ".") {
      y++;
      x--;
      continue;
    } else if (graph[y + 1][x + 1] === ".") {
      y++;
      x++;
      continue;
    }
    restfulSand++;
    graph[y][x] = "o";
    x = 500;
    y = 0;
  }
}

fallingSand(500, 0);
console.log(restfulSand);
