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
let currentNodes = Object.keys(instructions).filter((str) => str.endsWith("A"));
let currentNode = 0;
const allSteps = [];

function runSteps(currentLocation) {
  for (let i = 0; i < directions.length; i++) {
    const d = directions[i];
    const mappedDirection = directionalMap[d];
    currentLocation = instructions[currentLocation][mappedDirection];

    steps = steps + 1;

    if (currentLocation.endsWith("Z")) {
      currentNode++;
      const currentSteps = steps;
      steps = 0;
      allSteps.push(currentSteps);
      if (currentNodes[currentNode]) {
        runSteps(currentNodes[currentNode]);
      }
      break;
    }

    if (i === directions.length - 1) {
      i = -1;
      continue;
    }
  }
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcmArray(numbers) {
  if (numbers.length < 2) {
    throw new Error("At least two numbers are required to calculate LCM.");
  }

  return numbers.reduce((acc, current) => {
    return Math.abs(acc * current) / gcd(acc, current);
  });
}

runSteps(currentNodes[currentNode]);

console.log(lcmArray(allSteps));
