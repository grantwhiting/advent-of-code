const fs = require("fs");
const result = fs
  .readFileSync("./data.txt", "utf-8")
  .match(/mul\(\d+,\d+\)/g)
  .map((x) => x.replace(/[^0-9,]/g, ""))
  .map((x) => x.split(","))
  .map((x) => x.reduce((curr, next) => Number(curr) * Number(next)))
  .reduce((curr, next) => curr + next);

console.log(result);
