const fs = require("fs");
const elfFood = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n\s*\n/)
  .map((x) => x.split(/\n/));

const reducer = (arr) => arr.reduce((curr, acc) => (curr += Number(acc)), 0);
const totalCaloriesArrayDesc = elfFood
  .map((arr) => reducer(arr))
  .sort((a, b) => b - a);
const top3Total = reducer(totalCaloriesArrayDesc.slice(0, 3));

console.log(top3Total);
