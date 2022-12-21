const fs = require("fs");
const packets = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n\n")
  .map((d) => d.split("\n"))
  .flatMap((x) => x.map(eval));

const dividerPackets = [];

function compare(left, right) {
  const newLeft = [...left];
  const newRight = [...right];
  while (newLeft.length > 0 && newRight.length > 0) {
    const leftItem = newLeft[0];
    const rightItem = newRight[0];
    newLeft.shift();
    newRight.shift();

    if (typeof leftItem === "number" && typeof rightItem === "number") {
      if (leftItem < rightItem) {
        return -1;
      } else if (rightItem < leftItem) {
        return 1;
      }
      continue;
    }

    if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
      const subCompare = compare(leftItem, rightItem);
      if (subCompare !== 0) return subCompare;
    }

    if (Array.isArray(leftItem) && !Array.isArray(rightItem)) {
      const subCompare = compare(leftItem, [rightItem]);
      if (subCompare !== 0) return subCompare;
    }

    if (!Array.isArray(leftItem) && Array.isArray(rightItem)) {
      const subCompare = compare([leftItem], rightItem);
      if (subCompare !== 0) return subCompare;
    }
  }

  if (newLeft.length < newRight.length) {
    return -1;
  } else if (newRight.length < newLeft.length) {
    return 1;
  }
  return 0;
}

// compare packets
packets.sort((left, right) => compare(left, right));

packets.forEach((p, i) => {
  if (
    p.length === 1 &&
    Array.isArray(p[0]) &&
    p[0].length === 1 &&
    (p[0][0] === 2 || p[0][0] === 6)
  )
    dividerPackets.push(i + 1);
});

console.log(dividerPackets.reduce((a, b) => a * b));
