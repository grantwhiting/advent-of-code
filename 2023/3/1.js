const fs = require("fs");
const schematic = fs.readFileSync("./sample.txt", "utf-8").split(/\n/);

const numbersAdjacentToSymbols = [];
const symbols = [];

const isSymbol = (str) =>
  str !== undefined ? (str.match(/[^0-9.]+/g) ? true : false) : false;
const isNumber = (str) =>
  str !== undefined ? (str.match(/\d+/g) ? true : false) : null;

const numbersNotPrecededOrFollowedBySymbol = schematic.map((row) =>
  row.match(/(?<![#$*+])\b\d+\b(?![#$*+])/g)
);
