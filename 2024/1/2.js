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

const similarityScoreArray = [];

leftArray.forEach((leftItem) => {
  const count = rightArray.filter((rightItem) => rightItem === leftItem).length;
  similarityScoreArray.push(leftItem * count);
});

const similarityScore = similarityScoreArray.reduce(
  (total, num) => total + num,
  0
);

console.log(similarityScore);
