const fs = require("fs");
const totalFeet = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map(structureMapper)
  .map(calculator)
  .reduce((prev, curr) => prev + curr, 0);

function structureMapper(input) {
  const [l, w, h] = input.split("x");
  return {
    l: Number(l),
    w: Number(w),
    h: Number(h),
  };
}

function calculator(input) {
  const { l, w, h } = input;
  const surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
  const areaOfSmallestSide = Math.min(l * w, l * h, w * h);

  return surfaceArea + areaOfSmallestSide;
}

console.log(totalFeet);
