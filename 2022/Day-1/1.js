const fs = require("fs");
const elfFood = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n\s*\n/)
  .map((x) => x.split(/\n/))
  .map((arr) => arr.reduce((curr, acc) => (curr += Number(acc)), 0));
console.log(Math.max(...elfFood));
