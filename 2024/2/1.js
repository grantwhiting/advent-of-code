const fs = require("fs");
const unsafeReports = [];
const data = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((d) => ({
    input: d.split(/\s/).map(Number),
  }));

data.forEach((d) => checkSafety(d.input));

function checkSafety(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    const currInput = inputArr[i];
    try {
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
        unsafeReports.push(1);
        break;
      }
    } catch (e) {
      console.log(`Out of range: ${e.message}`);
    }
  }
}

console.log(data.length - unsafeReports.length);
