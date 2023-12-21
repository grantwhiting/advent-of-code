const fs = require("fs");
const almanac = fs
  .readFileSync("./sample.txt", "utf-8")
  .split(/\n\s*\n/)
  .slice(1);
const seeds = fs
  .readFileSync("./sample.txt", "utf-8")
  .split(/\n/)[0]
  .split(" ")
  .filter((s) => s.match(/\d/))
  .map(Number);
const almanacGroups = almanac.reduce((obj, item) => {
  const numbers = item.split("\n");
  const key = numbers.shift();
  const ranges = [];

  numbers.forEach((n) => {
    const nArr = n.split(" ").map(Number);
    ranges.push({
      destinationStart: nArr[0],
      sourceStart: nArr[1],
      range: nArr[2],
    });
  });

  return { ...obj, ...{ [key]: ranges } };
}, {});

Object.entries(almanacGroups).forEach(([key, value], i) => {
  value.forEach((r, j) => {
    const map = new Map();
    const sourceList = createList(r.sourceStart, r.range);
    const destinationList = createList(r.destinationStart, r.range);

    sourceList.forEach((sl, k) => {
      map.set(sl, destinationList[k]);
    });

    almanacGroups[key][`map${j + 1}`] = map;
  });
});

function createList(startingNumber, n) {
  return Array(n)
    .fill()
    .map((_, index) => startingNumber + index);
}

const locationNumbers = [];
seeds.forEach((s) => {
  Object.values(almanacGroups).forEach((ag, i) => {});
});

console.dir(seeds);
console.dir(almanacGroups, { depth: null });
