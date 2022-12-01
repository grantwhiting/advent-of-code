const fs = require("fs");
const elfFood = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n\s*\n/)
  .map((x) => x.split(/\n/))
  .map((arr) => reducer(arr))
  .sort((a, b) => b - a)
  .slice(0, 3);

function reducer(arr) {
  return arr.reduce((curr, acc) => (curr += Number(acc)), 0);
}

console.log(reducer(elfFood));
