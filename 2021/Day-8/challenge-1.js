// find occurrences of 1, 4, 7, 8
// 1 - 2 segments
// 4 - 4 segments
// 7 - 3 segments
// 8 - 7 segments

// how many of the entries have a segment length that matches one of the numbers above?

const fs = require("fs");
const segmentGroups = fs
  .readFileSync("./data.txt", "utf8")
  .split(/\n/)
  .map((combos) => {
    const [pattern, output] = combos.split(" | ");
    return { pattern, output };
  });

const allOutputs = segmentGroups.map((group) => group.output);

// find all strings with length of 2, 3, 4, or 7
const totalUniqueValues = allOutputs.map((output) =>
  output
    .split(" ")
    .filter(
      (str) =>
        str.length === 2 ||
        str.length === 3 ||
        str.length === 4 ||
        str.length === 7
    )
);

console.log(totalUniqueValues.flat().length);
