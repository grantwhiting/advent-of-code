const fs = require("fs");
const input = fs.readFileSync("./data.txt", "utf-8");
const rules = input.match(/^\d+\|\d+$/gm);
const printOrders = input.match(/^\d+(,\d+)*$/gm).map((x) => x.split(","));

for (let i = 0; i < printOrders.length; i++) {
  for (let j = 0; j < printOrders[i].length; j++) {
    const a = printOrders[i][j];
    const b = printOrders[i][j + 1];

    const regex = new RegExp(`^(${a}\\|${b}|${b}\\|${a})$`);
    const rule = rules.find((str) => regex.test(str));

    const splitRule = rule.split("|");

    if (a !== splitRule[0] || b !== splitRule[1]) {
      break;
    }

    if (j === printOrders[i].length - 2) {
      printOrders[i] = [];
      break;
    }
  }
}

const incorrectOrders = printOrders.filter((arr) => arr.length > 0);
const correctedOrders = [];

for (let i = 0; i < incorrectOrders.length; i++) {
  for (let j = 0; j < incorrectOrders[i].length; j++) {
    const a = incorrectOrders[i][j];
    const b = incorrectOrders[i][j + 1];

    if (a === undefined || b === undefined) continue;

    const regex = new RegExp(`^(${a}\\|${b}|${b}\\|${a})$`);
    const rule = rules.find((str) => regex.test(str));

    const splitRule = rule.split("|");

    if (a !== splitRule[0]) {
      incorrectOrders[i][j] = b;
      incorrectOrders[i][j + 1] = a;
      j = j - 2;
      continue;
    }

    if (j === incorrectOrders[i].length - 2) {
      correctedOrders.push(incorrectOrders[i]);
      break;
    }
  }
}

const middles = correctedOrders
  .map((arr) => arr[Math.floor(arr.length / 2)])
  .map(Number);

console.log(middles.reduce((a, b) => a + b));
