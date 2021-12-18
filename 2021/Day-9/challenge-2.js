const fs = require("fs");
const dataMatrix = fs
  .readFileSync("./data.txt", "utf8")
  .split(/\n/)
  .map((row) => [...row].map(Number));

const floodArea = dataMatrix.map((row, y) =>
  row.map((_, x) => (dataMatrix[y][x] === 9 ? 1 : 0))
);

const basins = [];

for (let i = 0; i < floodArea.length; i++) {
  for (let j = 0; j < floodArea[i].length; j++) {
    const basin = [];
    floodFill(i, j, basin);
    if (basin.length) {
      basins.push(basin);
    }
  }
}

function floodFill(i, j, basin) {
  // termination case
  if (
    i < 0 ||
    j < 0 ||
    i > floodArea.length ||
    j > floodArea[0].length ||
    floodArea[i] === undefined ||
    floodArea[i][j] === 1 ||
    floodArea[i][j] === undefined
  ) {
    return;
  }

  // recursion case
  floodArea[i][j] = 1;

  floodFill(i - 1, j, basin);
  floodFill(i + 1, j, basin);
  floodFill(i, j - 1, basin);
  floodFill(i, j + 1, basin);

  // add to basin
  basin.push(floodArea[i][j]);
}

console.log(
  basins
    .map((b) => b.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b)
);
