const fs = require("fs");
const treeMatrix = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) =>
    x.split("").map((x) => ({
      height: Number(x),
      isVisible: false
    }))
  );

treeMatrix.forEach((col, i) => {
  col.forEach((t, j) => {
    const precedingRowItems = treeMatrix[i].slice(0, j);
    const trailingRowItems = treeMatrix[i].slice(j + 1);
    const precedingColItems = treeMatrix.map((x) => x[j]).slice(0, i);
    const trailingColItems = treeMatrix.map((x) => x[j]).slice(i + 1);

    const tallestFromLeftEdge =
      t.height > Math.max(...precedingRowItems.map((x) => x.height));
    const tallestFromRightEdge =
      t.height > Math.max(...trailingRowItems.map((x) => x.height));
    const tallestFromTopEdge =
      t.height > Math.max(...precedingColItems.map((x) => x.height));
    const tallestFromBottomEdge =
      t.height > Math.max(...trailingColItems.map((x) => x.height));

    if (
      tallestFromLeftEdge ||
      tallestFromRightEdge ||
      tallestFromTopEdge ||
      tallestFromBottomEdge
    ) {
      t.isVisible = true;
    }
  });
});

console.log(
  treeMatrix
    .map((tr) => tr.filter((t) => t.isVisible).length)
    .reduce((a, b) => a + b)
);
