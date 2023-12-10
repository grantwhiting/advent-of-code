const fs = require("fs");
const schematic = fs
  .readFileSync("./sample.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const numbers = [];
const symbols = [];

const isSymbol = (str) =>
  str !== undefined ? (str.match(/[^0-9.]+/g) ? true : false) : false;
const isNumber = (str) =>
  str !== undefined ? (str.match(/\d+/g) ? true : false) : null;
const numbersNotPrecededOrFollowedBySymbol = (str) =>
  str.match(/(?<![#$*+])\b\d+\b(?![#$*+])/g);

schematic.forEach((row, y) => {
  row.forEach((item, x) => {
    if (isSymbol(item)) {
      symbols.push({
        symbol: item,
        x: x,
        y: y,
        surroundingCells: checkAdjacentCells(item, x, y),
      });
    }

    if (isNumber(item)) {
      numbers.push({ symbol: item, coordinates: { x, y } });
    }
  });
});

function checkAdjacentCells(x, y) {
  return [
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y },
    { x: x + 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x - 1, y: y + 1 },
    { x: x - 1, y: y },
    { x: x - 1, y: y - 1 },
  ];
}

const symbolAdjacentCellCoordinates = symbols.map((s) => s.surroundingCells);

numbers.forEach((number) => {});

console.dir(numbers, { depth: null });
