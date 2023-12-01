const fs = require("fs");
const total = fs
  .readFileSync("./sample.txt", "utf-8")
  .split(/\n/)
  .map(
    (x) =>
      x.match(/\d+/g) ||
      x.match(/(one|two|three|four|five|six|seven|eight|nine)/)
  );
// .map((x) => x.join(""))
// .flatMap((x) => [x[0] + x[x.length - 1]])
// .map(Number)
// .reduce((x, y) => x + y);

console.log(total);
`