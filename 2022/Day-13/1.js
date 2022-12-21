const fs = require("fs");
const packets = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n\n")
  .map((d) => d.split("\n"))
  .map((x) => x.map(eval));

const correctlyOrderedIndices = [];

function isCorrectOrder(left, right) {
  while (left.length > 0 && right.length > 0) {
    const leftItem = left[0];
    const rightItem = right[0];
    left.shift();
    right.shift();

    if (typeof leftItem === "number" && typeof rightItem === "number") {
      if (leftItem < rightItem) {
        return true;
      } else if (rightItem < leftItem) {
        return false;
      }
      continue;
    }

    if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
      const subCompare = isCorrectOrder(leftItem, rightItem);
      if (subCompare !== -1) return subCompare;
    }

    if (Array.isArray(leftItem) && !Array.isArray(rightItem)) {
      const subCompare = isCorrectOrder(leftItem, [rightItem]);
      if (subCompare !== -1) return subCompare;
    }

    if (!Array.isArray(leftItem) && Array.isArray(rightItem)) {
      const subCompare = isCorrectOrder([leftItem], rightItem);
      if (subCompare !== -1) return subCompare;
    }
  }

  if (left.length < right.length) {
    return true; // in order
  } else if (right.length < left.length) {
    return false; // not in order
  }
  return -1; // don't know
}

// compare packets
packets.forEach(([left, right], i) => {
  if (isCorrectOrder(left, right)) correctlyOrderedIndices.push(i + 1);
});

console.log(correctlyOrderedIndices.reduce((a, b) => a + b));
