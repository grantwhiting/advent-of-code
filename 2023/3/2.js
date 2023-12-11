const fs = require("fs");
const schematic = fs
  .readFileSync("./data.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const isStar = (str) =>
  str !== undefined ? (str.match(/[*]+/g) ? true : false) : false;
const isNumber = (str) =>
  str !== undefined ? (str.match(/\d+/g) ? true : false) : null;
const getAdjacentCellCoordinates = (x, y) => {
  return [
    [y, x - 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
    [y, x + 1],
    [y - 1, x + 1],
    [y - 1, x],
    [y - 1, x - 1],
  ];
};
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
const allStars = schematic.flatMap((row, y) =>
  row
    .map((cell, x) => {
      if (isStar(cell))
        return {
          symbol: cell,
          coordinates: [y, x],
          adjacentCells: getAdjacentCellCoordinates(x, y),
        };
    })
    .filter((cell) => cell !== undefined)
);
const adjacentStarCells = allStars.map((s) => s.coordinates);

schematic.forEach((row, y) => {
  let builtNumber = "";
  let coordinates = [];
  for (let x = 0; x < row.length; x++) {
    if (isNumber(row[x])) {
      if (builtNumber === "") builtNumber = row[x];
      const adjacentCells = getAdjacentCells(x, y);
      coordinates.push({ y, x });
      if (isNumber(adjacentCells.right)) {
        builtNumber += adjacentCells.right;
        continue;
      }
      allNumbers.push({
        number: builtNumber,
        coordinates,
        adjacentStarCoordinates: [],
        id: Math.random(),
      });
      coordinates = [];
      builtNumber = "";
    }
  }
});

allNumbers.forEach((n) => {
  n.coordinates.forEach((c) => {
    const adjCellsCoordinates = getAdjacentCellCoordinates(c.x, c.y);
    adjCellsCoordinates.forEach((acc) => {
      const stringifyAcc = acc.toString();
      adjacentStarCells.forEach((sc) => {
        const stringifySc = sc.toString();
        if (stringifyAcc === stringifySc)
          n.adjacentStarCoordinates = stringifySc;
      });
    });
  });
});

const gearRatios = [];
allNumbers.forEach((currNum) => {
  allNumbers.forEach((numToCheck) => {
    if (
      currNum.adjacentStarCoordinates === numToCheck.adjacentStarCoordinates &&
      currNum.id !== numToCheck.id
    ) {
      gearRatios.push([Number(currNum.number) * Number(numToCheck.number)]);
    }
  });
});

const uniqueGearRatios = [];
for (var i = 0; i < gearRatios.length; i++) {
  if (i % 2 !== 0) {
    uniqueGearRatios.push(gearRatios[i]);
  }
}

console.log(uniqueGearRatios.reduce((acc, curr) => Number(acc) + Number(curr)));
