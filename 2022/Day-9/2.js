const fs = require("fs");
const moves = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const dirs = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
};

const knots = {};
const tPositions = {};

for (let i = 0; i < [...Array(10)].length; i++) {
  knots[i] = [0, 0];
  tPositions[i] = new Set();
}

moves.forEach((move) => {
  let [direction, steps] = move.split(" ");
  steps = Number(steps);

  [...Array(steps)].forEach((_) => {
    const dir = dirs[direction];

    knots[0][0] += dir[0];
    knots[0][1] += dir[1];

    for (let j = 1; j < [...Array(10)].length; j++) {
      let addPoint = false;

      const run = knots[j - 1][0] - knots[j][0];
      const rise = knots[j - 1][1] - knots[j][1];

      if (Math.abs(run) === 2) {
        addPoint = true;
        knots[j][0] += Math.sign(run);
        if (Math.abs(rise) !== 0) knots[j][1] += Math.sign(rise);
      } else if (Math.abs(rise) === 2) {
        addPoint = true;
        knots[j][1] += Math.sign(rise);
        if (Math.abs(run) !== 0) knots[j][0] += Math.sign(run);
      }

      if (addPoint) {
        tPositions[j].add(`${knots[j][0]}, ${knots[j][1]}`);
      }
    }
  });
});

console.log(tPositions[9].size);
