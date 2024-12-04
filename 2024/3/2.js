const fs = require("fs");
const matches = fs
  .readFileSync("./data.txt", "utf-8")
  .match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

const resultList = [];
let shouldCount = true;

for (const match of matches) {
  if (/don't\(\)/g.test(match)) {
    shouldCount = false;
  } else if (/do\(\)/g.test(match)) {
    shouldCount = true;
  }

  if (shouldCount && /mul\(\d+,\d+\)/g.test(match)) {
    resultList.push(
      match
        .replace(/[^0-9,]/g, "")
        .split(",")
        .reduce((curr, next) => Number(curr) * Number(next))
    );
  }
}

console.log(resultList.reduce((curr, next) => curr + next));
