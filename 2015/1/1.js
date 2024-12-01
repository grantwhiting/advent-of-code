const fs = require("fs");
const instructions = fs.readFileSync("./input.txt", "utf-8");

const mapper = {
  "(": 1,
  ")": -1,
};

let floor = 0;

for (const char of instructions) {
  floor += mapper[char];
}

console.log(floor);
