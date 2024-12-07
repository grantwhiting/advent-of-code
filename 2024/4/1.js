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
    if (el === "X") {
      if (saveXmasUp(x, y)) {
        xMasCounter++;
      }

      if (saveXmasUpRight(x, y)) {
        xMasCounter++;
      }

      if (saveXmasRight(x, y)) {
        xMasCounter++;
      }

      if (saveXmasDownRight(x, y)) {
        xMasCounter++;
      }

      if (saveXmasDown(x, y)) {
        xMasCounter++;
      }

      if (saveXmasDownLeft(x, y)) {
        xMasCounter++;
      }

      if (saveXmasLeft(x, y)) {
        xMasCounter++;
      }

      if (saveXmasUpLeft(x, y)) {
        xMasCounter++;
      }
    }
  }
}

function saveXmasUp(x, y) {
  const M = y > 0 ? mtx[y - 1][x] : undefined;
  const A = y > 1 ? mtx[y - 2][x] : undefined;
  const S = y > 2 ? mtx[y - 3][x] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasUpRight(x, y) {
  const M = y > 0 && x < mtx[y].length - 1 ? mtx[y - 1][x + 1] : undefined;
  const A = y > 1 && x < mtx[y].length - 2 ? mtx[y - 2][x + 2] : undefined;
  const S = y > 2 && x < mtx[y].length - 3 ? mtx[y - 3][x + 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasRight(x, y) {
  const M = x < mtx[y].length - 1 ? mtx[y][x + 1] : undefined;
  const A = x < mtx[y].length - 2 ? mtx[y][x + 2] : undefined;
  const S = x < mtx[y].length - 3 ? mtx[y][x + 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasDownRight(x, y) {
  const M =
    y < mtx.length - 1 && x < mtx[y].length - 1 ? mtx[y + 1][x + 1] : undefined;
  const A =
    y < mtx.length - 2 && x < mtx[y].length - 2 ? mtx[y + 2][x + 2] : undefined;
  const S =
    y < mtx.length - 3 && x < mtx[y].length - 3 ? mtx[y + 3][x + 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasDown(x, y) {
  const M = y < mtx.length - 1 ? mtx[y + 1][x] : undefined;
  const A = y < mtx.length - 2 ? mtx[y + 2][x] : undefined;
  const S = y < mtx.length - 3 ? mtx[y + 3][x] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasDownLeft(x, y) {
  const M = y < mtx.length - 1 && x > 0 ? mtx[y + 1][x - 1] : undefined;
  const A = y < mtx.length - 2 && x > 1 ? mtx[y + 2][x - 2] : undefined;
  const S = y < mtx.length - 3 && x > 2 ? mtx[y + 3][x - 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasLeft(x, y) {
  const M = x > 0 ? mtx[y][x - 1] : undefined;
  const A = x > 1 ? mtx[y][x - 2] : undefined;
  const S = x > 2 ? mtx[y][x - 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

function saveXmasUpLeft(x, y) {
  const M = y > 0 && x > 0 ? mtx[y - 1][x - 1] : undefined;
  const A = y > 1 && x > 1 ? mtx[y - 2][x - 2] : undefined;
  const S = y > 2 && x > 2 ? mtx[y - 3][x - 3] : undefined;

  return `X${M}${A}${S}` === "XMAS";
}

console.log(xMasCounter);
