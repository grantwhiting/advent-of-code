const fs = require("fs");
const instructions = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

let X = 1;
let cycle = 0;
const CRT = [...Array(6)].map(() => [...Array(40)].fill(" "));
let currentCRTrow = 0;
let currentRowPos = 0;
let currentSet = 40;

instructions.forEach((ins) => {
  const spritePosition = [X - 1, X, X + 1];

  cycle++;
  currentRowPos++;
  if (spritePosition.includes(currentRowPos - 1)) {
    CRT[currentCRTrow][currentRowPos - 1] = "#";
  }

  if (cycle === currentSet) {
    currentSet += 40;
    currentCRTrow++;
    currentRowPos = 0;
  }

  if (ins === "noop") return;

  cycle++;
  currentRowPos++;

  if (cycle === currentSet) {
    currentSet += 40;
    currentCRTrow++;
    currentRowPos = 0;
  }

  if (spritePosition.includes(currentRowPos - 1)) {
    CRT[currentCRTrow][currentRowPos - 1] = "#";
  }

  X += Number(ins.split(" ")[1]);
});

console.log(CRT.map((x) => x.join("")));
