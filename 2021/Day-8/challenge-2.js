const fs = require("fs");
const segmentGroups = fs
  .readFileSync("./data.txt", "utf8")
  .split(/\n/)
  .map((combos) => {
    const [input, output] = combos.split(" | ");
    return { input, output };
  });

const allInputs = segmentGroups.map((group) => group.input);
const inputGroups = allInputs.map((input) => input.split(" "));
const allOutputs = segmentGroups.map((group) => group.output);
const outputTotals = [];

inputGroups.forEach((group, i) => {
  const sortedOutput = allOutputs[i]
    .split(" ")
    .map((number) => number.split("").sort().join(""));

  const map = new Map();
  mapData(group).forEach((number, i) => map.set(i, number));

  const decodedOutput = sortedOutput.map((number) =>
    getKeyByValue(map, number)
  );

  outputTotals.push(decodedOutput.join(""));
});

console.log(outputTotals.reduce((a, b) => parseInt(a) + parseInt(b)));

function getKeyByValue(map, number) {
  for (let [key, value] of map) {
    if (value === number) {
      return key;
    }
  }
}

function mapData(group) {
  const one = group.find((segment) => segment.length === 2);
  const four = group.find((segment) => segment.length === 4);
  const seven = group.find((segment) => segment.length === 3);
  const eight = group.find((segment) => segment.length === 7);

  const segs234 = group
    .filter((seg) => seg.length === 6)
    .flatMap((seg) => [...eight].filter((i) => !seg.includes(i)));

  const seg4 = segs234.find((seg) => !four.includes(seg));
  const nine = [...eight].filter((i) => i !== seg4).join("");
  const seg2 = segs234.find((seg) => one.includes(seg));
  const six = [...eight].filter((i) => i !== seg2).join("");
  const seg3 = segs234.find((seg) => ![seg2, seg4].includes(seg));
  const zero = [...eight].filter((i) => i !== seg3).join("");
  const five = [...eight].filter((i) => ![seg2, seg4].includes(i)).join("");
  const seg5 = [...one].find((i) => six.includes(i));
  const seg1 = [...four].find((i) => ![seg2, seg3, seg5].includes(i));
  const three = [...eight].filter((i) => ![seg1, seg4].includes(i)).join("");
  const two = [...three, ...seg4].filter((i) => i !== seg5).join("");

  const values = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ].map((x) => x.split("").sort().join(""));

  return values;
}
