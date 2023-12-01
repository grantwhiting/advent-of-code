const fs = require("fs");
const stringsToFind = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const total = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) =>
    extractOverlappingStrings(x, stringsToFind).map((str) =>
      str
        .replace("one", "1")
        .replace("two", "2")
        .replace("three", "3")
        .replace("four", "4")
        .replace("five", "5")
        .replace("six", "6")
        .replace("seven", "7")
        .replace("eight", "8")
        .replace("nine", "9")
    )
  )
  .map((x) => x.join(""))
  .flatMap((x) => [x[0] + x[x.length - 1]])
  .map(Number)
  .reduce((x, y) => x + y);

console.log(total);

function extractOverlappingStrings(input, strings) {
  const matches = [];

  for (let i = 0; i < input.length; i++) {
    for (const str of strings) {
      if (input.startsWith(str, i)) {
        matches.push(str);
      }
    }
  }

  return matches;
}
