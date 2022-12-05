const fs = require("fs");
const stacks = fs
  .readFileSync("./data_input.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(","));
const instructions = fs
  .readFileSync("./data_instructions.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(" "))
  .map((x) => ({
    move: Number(x[1]),
    from: Number(x[3]) - 1,
    to: Number(x[5]) - 1,
  }));

const messageArr = [];

instructions.forEach((ins, idx) => {
  const { move, from, to } = ins;

  const itemsToMove = [...new Array(move)].flatMap((_) => stacks[from].pop());

  itemsToMove.forEach((item) => {
    stacks[to].push(item);
  });
});

stacks.forEach((s) => {
  messageArr.push(s.pop());
});

console.log(messageArr.join(""));
