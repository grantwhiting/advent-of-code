const fs = require("fs");
const instructions = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

let X = 1;
let cycle = 0;
const signals = [];

instructions.forEach((ins) => {
  cycle++;

  if (ins === "noop") {
    if (cycle % 40 === 20) signals.push(cycle * X);
    return;
  }

  if (cycle % 40 === 20) signals.push(cycle * X);

  cycle++;

  if (cycle % 40 === 20) signals.push(cycle * X);

  X += Number(ins.split(" ")[1]);
});

console.log(signals.reduce((a, b) => a + b));
