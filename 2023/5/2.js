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

const almanacGroupNames = [
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
];

const almanacGroupsMap = new Map();

almanacGroupNames.forEach((name) => {
  almanacGroupsMap.set(name, almanacGroups[name]);
});

let location;

for (let seedsIdx = 0; seedsIdx < seeds.length; seedsIdx++) {
  const almanacGroupsMapCopy = new Map(almanacGroupsMap);
  const s = seeds[seedsIdx];
  let result;

  for (let [currentGroupName, maps] of almanacGroupsMapCopy) {
    almanacGroupsMapCopy.delete(currentGroupName);

    for (let mapsIdx = 0; mapsIdx < maps.length; mapsIdx++) {
      const { sourceStart, destinationStart, range } = maps[mapsIdx];
      const numberToCheck = result || s;

      // if in range - add to the locations array
      if (
        numberToCheck >= sourceStart &&
        numberToCheck <= sourceStart + range
      ) {
        // find the matching number in destinationSource
        const position = numberToCheck - sourceStart;
        const destinationMatch = destinationStart + position;
        result = destinationMatch;
        break;
      }
    }

    if (almanacGroupsMapCopy.size === 0) {
      // if last location is smaller than current -- kep it
      // else take current
      const lastLocation = location;

      if (lastLocation < result) {
        location = lastLocation;
      } else {
        location = result;
      }
    }
  }
}

console.log(location);
// console.log(Math.min(...locations));
