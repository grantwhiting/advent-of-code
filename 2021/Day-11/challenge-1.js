const fs = require("fs");
const matrix = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => [...x])
  .map((x) => x.map(Number));

let flashes = 0;

for (let i = 0; i < 100; i++) {
  powerUp(matrix);

  matrix.forEach((row, i) =>
    row.forEach((_, j) => {
      if (matrix[i][j] > 9) {
        flash(matrix, i, j);
      }
    })
  );
  reset(matrix);
}

function flash(matrix, i, j) {
  flashes++;

  if (matrix[i][j] === "✅") {
    return;
  }

  matrix[i][j] = "✅";
  // get indices of neighbors
  const neighbors = getNeighborsIndices(i, j);
  neighbors.forEach(([ni, nj]) => {
    if (matrix[ni] && matrix[ni][nj]) {
      if (matrix[ni][nj] !== "✅") {
        matrix[ni][nj]++;
      }
      if (matrix[ni][nj] > 9) {
        flash(matrix, ni, nj);
      }
    }
  });
}

function getNeighborsIndices(i, j) {
  return [
    [i - 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
    [i + 1, j],
    [i + 1, j - 1],
    [i, j - 1],
    [i - 1, j - 1],
  ];
}

function powerUp(matrix) {
  matrix.forEach((row, i) =>
    row.forEach((_, j) => {
      matrix[i][j]++;
    })
  );
}

function reset(matrix) {
  matrix.forEach((row, i) =>
    row.forEach((_, j) => {
      if (matrix[i][j] === "✅") {
        matrix[i][j] = 0;
      }
    })
  );
}

console.log(flashes);
