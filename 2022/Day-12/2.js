const fs = require("fs");
const map = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(""));

function getShortestPath(matrix) {
  const M = matrix.length;
  const N = matrix[0].length;
  const visited = Array.from(Array(M), () => Array(N).fill("❌"));
  const q = [];

  // replace letters with values
  matrix.forEach((m, i) =>
    m.forEach((n, j) => {
      if (n !== "S" && n !== "E" && n !== "a") {
        matrix[i][j] = parseInt(n, 36) - 9;
      } else if (n === "S" || n === "a") {
        matrix[i][j] = 1;
        q.push({ y: i, x: j, dist: 0 });
        visited[i][j] = "✅";
      } else {
        matrix[i][j] = 27;
      }
    })
  );

  // BFS
  while (q.length !== 0) {
    const currentItem = q[0];
    q.shift();

    // destination found
    if (matrix[currentItem.y][currentItem.x] === 27) {
      return currentItem.dist;
    }

    // move up
    if (
      matrix[currentItem.y - 1] &&
      matrix[currentItem.y - 1][currentItem.x] <=
        matrix[currentItem.y][currentItem.x] + 1 &&
      visited[currentItem.y - 1][currentItem.x] === "❌"
    ) {
      q.push({
        y: currentItem.y - 1,
        x: currentItem.x,
        dist: currentItem.dist + 1,
      });
      visited[currentItem.y - 1][currentItem.x] = "✅";
    }

    // move right
    if (
      matrix[currentItem.y][currentItem.x + 1] &&
      matrix[currentItem.y][currentItem.x + 1] <=
        matrix[currentItem.y][currentItem.x] + 1 &&
      visited[currentItem.y][currentItem.x + 1] === "❌"
    ) {
      q.push({
        y: currentItem.y,
        x: currentItem.x + 1,
        dist: currentItem.dist + 1,
      });
      visited[currentItem.y][currentItem.x + 1] = "✅";
    }

    // move down
    if (
      matrix[currentItem.y + 1] &&
      matrix[currentItem.y + 1][currentItem.x] <=
        matrix[currentItem.y][currentItem.x] + 1 &&
      visited[currentItem.y + 1][currentItem.x] === "❌"
    ) {
      q.push({
        y: currentItem.y + 1,
        x: currentItem.x,
        dist: currentItem.dist + 1,
      });
      visited[currentItem.y + 1][currentItem.x] = "✅";
    }

    // move left
    if (
      matrix[currentItem.y][currentItem.x - 1] &&
      matrix[currentItem.y][currentItem.x - 1] <=
        matrix[currentItem.y][currentItem.x] + 1 &&
      visited[currentItem.y][currentItem.x - 1] === "❌"
    ) {
      q.push({
        y: currentItem.y,
        x: currentItem.x - 1,
        dist: currentItem.dist + 1,
      });
      visited[currentItem.y][currentItem.x - 1] = "✅";
    }
  }
  return -1;
}

console.log(getShortestPath(map));
