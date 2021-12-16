const fs = require("fs");
const dataMatrix = fs
  .readFileSync("./data.txt", "utf8")
  .split(/\n/)
  .map((row) => [...row].map(Number));

const lowPoints = [];

function getCell(matrix, y, x) {
  const noValue = null;
  let value;
  let hasValue;

  try {
    hasValue = matrix[y][x] !== undefined;
    value = hasValue ? matrix[y][x] : noValue;
  } catch (e) {
    value = noValue;
  }

  return value;
}

function getAdjacentCells(matrix, y, x) {
  return {
    up: getCell(matrix, y - 1, x),
    right: getCell(matrix, y, x + 1),
    down: getCell(matrix, y + 1, x),
    left: getCell(matrix, y, x - 1),
  };
}

function getAllAdjacentCells(matrix, action, arg) {
  const rows = matrix.length;

  arg = typeof arg === "object" ? arg : null;

  // access each row in the matrix
  for (let y = 0; y < rows; y++) {
    const row = matrix[y];
    const cells = row.length;

    // access each cell in the row
    for (let x = 0; x < cells; x++) {
      const cell = row[x];

      action.call(arg, cell, y, x, matrix);
    }
  }
}

function isLowPoint(cell, adjCells) {
  return adjCells
    .filter((adjCell) => adjCell !== null)
    .every((adjCell) => cell < adjCell);
}

getAllAdjacentCells(dataMatrix, (cell, y, x, matrix) => {
  const adjCells = Object.values(getAdjacentCells(matrix, y, x));
  if (isLowPoint(cell, adjCells)) {
    lowPoints.push(cell);
  }
});

console.log(lowPoints.map((p) => p + 1).reduce((a, b) => a + b));
