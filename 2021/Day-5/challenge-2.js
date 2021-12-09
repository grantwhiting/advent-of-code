const fs = require("fs");
const data = fs
  .readFileSync("./data.txt", "utf-8")
  .replace(/\r/g)
  .split(/\n/)
  .filter(Boolean)
  .map((line) => {
    const [from, to] = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map(Number);
      return { x, y };
    });
    return { from, to };
  });

const map = new Map();
let count = 0;

for (const line of data) {
  // from start to end of line
  const isHorizontal = line.from.y == line.to.y;
  const isVertical = line.from.x == line.to.x;
  const currentLine = { x: line.from.x, y: line.from.y };

  // for each point in the line add it to the sequence
  while (currentLine.x !== line.to.x || currentLine.y !== line.to.y) {
    addPoint([currentLine.x, currentLine.y].join(","));

    if (isHorizontal) {
      currentLine.x += currentLine.x < line.to.x ? 1 : -1;
    } else if (isVertical) {
      currentLine.y += currentLine.y < line.to.y ? 1 : -1;
    } else {
      currentLine.x += currentLine.x < line.to.x ? 1 : -1;
      currentLine.y += currentLine.y < line.to.y ? 1 : -1;
    }
  }
  addPoint([currentLine.x, currentLine.y].join(","));
}
console.log(map);

function addPoint(key) {
  let content = map.get(key);

  if (!content) {
    content = 0;
  }

  content++;

  if (content === 2) {
    count++;
  }

  map.set(key, content);
}

console.log(count);
