const fs = require("fs");

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const gameResults = {};
const data = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

data.forEach((d, i) => {
  gameResults[d.match(/Game \d+/g)] = [];
});

data.map((x, i) =>
  x
    .split(";")
    .map((x) => x.trim())
    .map((x) => x.replace(/Game \d+: /g, ""))
    .map((x) =>
      x
        .split(",")
        .map((y) => ({
          [y.match(/(red|green|blue)/g)]: Number(y.match(/\d+/g)[0]),
        }))
        .reduce((y, z) => ({ ...y, ...z }))
    )
    .forEach((set, j) => {
      if (set.red !== undefined) {
        if (set.red <= limits.red) {
          gameResults[`Game ${i + 1}`].push("✅");
        } else {
          gameResults[`Game ${i + 1}`].push("❌");
        }
      }

      if (set.green !== undefined) {
        if (set.green <= limits.green) {
          gameResults[`Game ${i + 1}`].push("✅");
        } else {
          gameResults[`Game ${i + 1}`].push("❌");
        }
      }

      if (set.blue !== undefined) {
        if (set.blue <= limits.blue) {
          gameResults[`Game ${i + 1}`].push("✅");
        } else {
          gameResults[`Game ${i + 1}`].push("❌");
        }
      }
    })
);

const passingGameIds = [];
let i = 0;

for (const [key, value] of Object.entries(gameResults)) {
  i++;
  console.log(value);
  if (value.includes("❌")) {
    continue;
  } else {
    passingGameIds.push(i);
  }
}

console.log(passingGameIds.reduce((x, y) => x + y));
