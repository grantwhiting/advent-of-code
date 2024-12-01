const fs = require("fs");
const instructions = fs.readFileSync("./input.txt", "utf-8");

const mapper = {
  "(": 1,
  ")": -1,
};

let floor = 0;
let idx = 0;

for (const char of instructions) {
  idx++;
  floor += mapper[char];
  if (floor === -1) break;
}

console.log(floor);
console.log(idx);
