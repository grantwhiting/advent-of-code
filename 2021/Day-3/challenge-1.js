const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

const convertToArrayOfEachIdx = (idx) => data.map((x) => parseInt(x[idx]));

const transformedArray = [...Array(data[0].length).keys()].map((_, i) =>
  convertToArrayOfEachIdx(i)
);

const isOne = (array) =>
  array.reduce((curr, next) => curr + next) > array.length / 2;

const gammaRate = transformedArray.map((x) => (isOne(x) ? 1 : 0));
const epsilonRate = transformedArray.map((x) => (isOne(x) ? 0 : 1));

console.log(
  parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2)
);
