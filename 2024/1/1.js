const fs = require("fs");
const leftArray = [];
const rightArray = [];

fs.readFileSync("./data.txt", "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.trim().split(/\s+/).map(Number))
  .forEach((x) => {
    const [left, right] = x;

    leftArray.push(left);
    rightArray.push(right);
  });

leftArray.sort();
rightArray.sort();

let totalDifference = 0;

for (let i = 0; i < leftArray.length; i++) {
  const diff = Math.abs(leftArray[i] - rightArray[i]);
  totalDifference += diff;
}

console.log(totalDifference);
