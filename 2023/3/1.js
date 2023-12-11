const fs = require("fs");
const schematic = fs
  .readFileSync("./data.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const isSymbol = (str) =>
  str !== undefined ? (str.match(/[^0-9.]+/g) ? true : false) : false;
const isNumber = (str) =>
  str !== undefined ? (str.match(/\d+/g) ? true : false) : null;
const isPeriod = (str) =>
  str !== undefined ? (str.match(/./g) ? true : false) : null;
const getAdjacentCells = (x, y) => {
  return {
    left: schematic[y][x - 1],
    bottomLeft: schematic[y + 1] ? schematic[y + 1][x - 1] : undefined,
    bottom: schematic[y + 1] ? schematic[y + 1][x] : undefined,
    bottomRight: schematic[y + 1] ? schematic[y + 1][x + 1] : undefined,
    right: schematic[y][x + 1],
    topRight: schematic[y - 1] ? schematic[y - 1][x + 1] : undefined,
    top: schematic[y - 1] ? schematic[y - 1][x] : undefined,
    topLeft: schematic[y - 1] ? schematic[y - 1][x - 1] : undefined,
  };
};

const allNumbers = [];

schematic.forEach((row, y) => {
  let builtNumber = "";
  let coordinates = [];
  for (let x = 0; x < row.length; x++) {
    if (isNumber(row[x])) {
      if (builtNumber === "") builtNumber = row[x];
      const adjacentCells = getAdjacentCells(x, y);
      coordinates.push({ y, x });
      // check if right isNumber
      if (isNumber(adjacentCells.right)) {
        builtNumber += adjacentCells.right;
        continue;
      }
      allNumbers.push({
        number: builtNumber,
        coordinates,
        isPartNumber: false,
      });
      coordinates = [];
      builtNumber = "";
    }
  }
});

allNumbers.forEach((n) => {
  n.coordinates.forEach((c) => {
    const adjCells = getAdjacentCells(c.x, c.y);
    Object.values(adjCells).forEach((ac) => {
      if (isSymbol(ac)) {
        n.isPartNumber = true;
      }
    });
  });
});

const partNumbers = allNumbers
  .map((n) => {
    if (n.isPartNumber) return Number(n.number);
  })
  .filter((n) => n !== undefined);

console.log(partNumbers.reduce((acc, cur) => acc + cur));
