const fs = require("fs");
const treeMatrix = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) =>
    x.split("").map((x) => ({
      height: Number(x),
      score: null,
    }))
  );

treeMatrix.forEach((row, i) => {
  row.forEach((t, j) => {
    const precedingRowItems = treeMatrix[i].slice(0, j);
    const trailingRowItems = treeMatrix[i].slice(j + 1);
    const precedingColItems = treeMatrix.map((x) => x[j]).slice(0, i);
    const trailingColItems = treeMatrix.map((x) => x[j]).slice(i + 1);

    const precedingRowItemsReversed = [...precedingRowItems.reverse()];
    const precedingColItemsReversed = [...precedingColItems.reverse()];

    let topCount = 0;
    let rightCount = 0;
    let bottomCount = 0;
    let leftCount = 0;

    for (let y = 0; y < precedingRowItemsReversed.length; y++) {
      leftCount++;

      if (t.height <= precedingRowItemsReversed[y].height) {
        break;
      }
    }

    for (let y = 0; y < trailingRowItems.length; y++) {
      rightCount++;

      if (t.height <= trailingRowItems[y].height) {
        break;
      }
    }

    for (let y = 0; y < precedingColItemsReversed.length; y++) {
      topCount++;

      if (t.height <= precedingColItemsReversed[y].height) {
        break;
      }
    }

    for (let y = 0; y < trailingColItems.length; y++) {
      bottomCount++;

      if (t.height <= trailingColItems[y].height) {
        break;
      }
    }

    t.score = [topCount, rightCount, bottomCount, leftCount].reduce(
      (a, b) => a * b
    );
  });
});

console.log(Math.max(...treeMatrix.flatMap((x) => x.map((y) => y.score))));
