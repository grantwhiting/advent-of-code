const fs = require("fs");
const almanac = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n\s*\n/)
  .slice(1);
const seeds = fs
  .readFileSync("./data.txt", "utf-8")
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

const rangeResults = seeds.reduce((acc, curr) => {
  return { ...acc, ...{ [curr]: [] } };
}, {});

seeds.forEach((s, i) => {
  const almanacGroupsCopy = { ...almanacGroups };
  Object.entries(almanacGroupsCopy).forEach(([key, value]) => {
    const maps = Object.keys(value)
      .filter((key) => /^map/.test(key))
      .map((x) => value[x]);

    delete almanacGroupsCopy[key];

    let result;

    if (rangeResults[s].length) {
      result = rangeResults[s][rangeResults[s].length - 1];
    }

    for (let y = 0; y < maps.length; y++) {
      const shouldContinue = getValueFromMap(maps[y], result || s, s);
      if (shouldContinue) {
        continue;
      }
      break;
    }
  });
});

function createList(startingNumber, n) {
  return Array(n)
    .fill()
    .map((_, index) => startingNumber + index);
}

function getValueFromMap(map, number, seed) {
  if (map.get(number)) {
    rangeResults[seed].push(map.get(number));
    return false;
  }

  return true;
}

const locationNumbers = Object.values(rangeResults).map((x) => x.pop());

console.dir(Math.min(...locationNumbers), { depth: null });
