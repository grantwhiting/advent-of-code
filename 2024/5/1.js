const fs = require("fs");
const input = fs.readFileSync("./data.txt", "utf-8");
const rules = input.match(/^\d+\|\d+$/gm);
const printOrders = input.match(/^\d+(,\d+)*$/gm).map((x) => x.split(","));

const correctPrintOrders = [];

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
      correctPrintOrders.push(printOrders[i]);
      break;
    }
  }
}

const middles = correctPrintOrders
  .map((arr) => arr[Math.floor(arr.length / 2)])
  .map(Number);

console.log(middles.reduce((a, b) => a + b));
