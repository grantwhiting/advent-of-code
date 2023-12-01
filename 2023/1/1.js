const fs = require("fs");
const total = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.match(/\d+/g))
  .map((x) => x.join(""))
  .flatMap((x) => [x[0] + x[x.length - 1]])
  .map(Number)
  .reduce((x, y) => x + y);

console.log(total);
