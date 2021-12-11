const fs = require("fs");
const crabPos = fs.readFileSync("./data.txt", "utf-8").split(",").map(Number);

// make object with arrays for difference of each board position and crab position
const positionArrays = {};

crabPos.forEach((_, i) => {
  positionArrays[i] = [];
});

// loop through crab positions and subtract the board position from each crab position
crabPos.forEach((p1, i) => {
  crabPos.forEach((p2) => {
    const fuelUsed = p1 - p2;
    positionArrays[i].push(Math.abs(fuelUsed));
  });
});

// sum up all position arrays in object and get min value
const summedArrays = Object.values(positionArrays).map((val) =>
  val.reduce((a, b) => a + b)
);

console.log(Math.min(...summedArrays));
