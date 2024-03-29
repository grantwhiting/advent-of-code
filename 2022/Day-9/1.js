const fs = require("fs");
const moves = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const dirs = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
};

const tPositions = new Set();
const T = [0, 0];
const H = [0, 0];

moves.forEach((move, i) => {
  let [direction, steps] = move.split(" ");
  steps = Number(steps);

  for (const _ of [...Array(steps)]) {
    const dir = dirs[direction];
    const previousHX = H[0];
    const previousHY = H[1];
    H[0] += dir[0];
    H[1] += dir[1];

    const rise = H[1] - T[1];
    const run = H[0] - T[0];

    if (i === 0 || Math.abs(rise) === 2 || Math.abs(run) === 2) {
      T[0] = previousHX;
      T[1] = previousHY;

      tPositions.add(`${T[0]}, ${T[1]}`);
    }
  }
});

console.log(tPositions.size);
