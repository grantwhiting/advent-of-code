const fs = require("fs");
const rawData = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .filter((l) => l !== "");
const directions = rawData.shift().split("");
const instructions = rawData.reduce((obj, curr) => {
  return {
    ...obj,
    ...{
      [curr.match(/^(.*?)\s*=/)[1].trim()]: curr
        .match(/\((.*?)\)/)[1]
        .trim()
        .split(",")
        .map((x) => x.trim()),
    },
  };
}, {});

const directionalMap = { L: 0, R: 1 };

let steps = 0;
let currentLocation = "AAA";

for (let i = 0; i < directions.length; i++) {
  const d = directions[i];
  const mappedDirection = directionalMap[d];
  currentLocation = instructions[currentLocation][mappedDirection];
  steps = steps + 1;

  if (currentLocation === "ZZZ") break;

  if (i === directions.length - 1) {
    i = -1;
    continue;
  }
}

console.log(steps);
