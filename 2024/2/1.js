const fs = require("fs");
const data = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((d) => ({
    input: d.split(/\s/).map(Number),
    isSafe: true,
  }));

data.forEach((d, idx) => checkSafety(d.input, idx));

function checkSafety(inputArr, idx) {
  for (let i = 0; i < inputArr.length; i++) {
    const currInput = inputArr[i];
    const nextInput = inputArr[i + 1];
    const prevInput = inputArr[i - 1];

    const goesFromIncreasingToDecreasing =
      prevInput < currInput && currInput > nextInput;
    const goesFromDecreasingToIncreasing =
      prevInput > currInput && currInput < nextInput;
    const inputDiffTooLarge = Math.abs(nextInput - currInput) > 3;
    const inputDidNotChange = currInput === nextInput;

    if (
      goesFromIncreasingToDecreasing ||
      goesFromDecreasingToIncreasing ||
      inputDiffTooLarge ||
      inputDidNotChange
    ) {
      data[idx].isSafe = false;
      break;
    }
  }
}

console.log(data.filter((d) => d.isSafe).length);
