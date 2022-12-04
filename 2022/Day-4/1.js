const fs = require("fs");
const regions = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(","))
  .map(([x, y]) => {
    const [x1, x2] = x.split("-");
    const [y1, y2] = y.split("-");
    return [getRange(Number(x1), Number(x2)), getRange(Number(y1), Number(y2))];
  });

function getRange(low, high) {
  const list = [];
  for (var i = low; i <= high; i++) {
    list.push(i);
  }

  return list;
}

let orpCount = 0;

function regionChecker(arr, target) {
  return target.every((x) => arr.includes(x));
}

regions.forEach(([r1, r2]) => {
  if (regionChecker(r1, r2) || regionChecker(r2, r1)) orpCount++;
});

console.log(orpCount);
