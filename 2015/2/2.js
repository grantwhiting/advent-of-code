const fs = require("fs");
const totalFeetOfRibbon = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map(structureMapper)
  .map(calculateRibbon)
  .reduce((prev, curr) => prev + curr, 0);

function structureMapper(input) {
  const [l, w, h] = input.split("x");
  return {
    l: Number(l),
    w: Number(w),
    h: Number(h),
  };
}

function calculateRibbon(input) {
  const { l, w, h } = input;
  const largestNumber = Math.max(l, w, h);
  const arr = [l, w, h];
  const idxOfLargestNumber = arr.indexOf(largestNumber);
  arr.splice(idxOfLargestNumber, 1);

  return arr[0] * 2 + arr[1] * 2 + l * w * h;
}

console.log(totalFeetOfRibbon);
