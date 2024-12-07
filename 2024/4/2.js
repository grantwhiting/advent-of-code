const fs = require("fs");
const mtx = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(""));

let xMasCounter = 0;

// first loop: y coord
for (let y = 0; y < mtx.length; y++) {
  // second loop: x coord
  for (let x = 0; x < mtx[y].length; x++) {
    const el = mtx[y][x];
    // search("up", el, "X", [x, y]);
    if (el === "A") {
      if (saveXmasUpRightDownLeft(x, y) && saveXmasUpLeftDownRight(x, y)) {
        xMasCounter++;
      }
    }
  }
}

function saveXmasUpRightDownLeft(x, y) {
  const upRight =
    y > 0 && x < mtx[y].length - 1 ? mtx[y - 1][x + 1] : undefined;
  const downLeft = y < mtx.length - 1 && x > 0 ? mtx[y + 1][x - 1] : undefined;

  return (
    (upRight === "M" && downLeft === "S") ||
    (upRight === "S" && downLeft === "M")
  );
}

function saveXmasUpLeftDownRight(x, y) {
  const downRight =
    y < mtx.length - 1 && x < mtx[y].length - 1 ? mtx[y + 1][x + 1] : undefined;
  const upLeft = y > 0 && x > 0 ? mtx[y - 1][x - 1] : undefined;

  return (
    (downRight === "M" && upLeft === "S") ||
    (downRight === "S" && upLeft === "M")
  );
}

console.log(xMasCounter);
