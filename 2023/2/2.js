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

const result = data
  .map((x, i) =>
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
  )
  .map((game, i) => {
    const redArr = [];
    const greenArr = [];
    const blueArr = [];
    game.forEach((round) => {
      if (round.red !== undefined) {
        redArr.push(round.red);
      }

      if (round.blue !== undefined) {
        blueArr.push(round.blue);
      }

      if (round.green !== undefined) {
        greenArr.push(round.green);
      }
    });

    return Math.max(...redArr) * Math.max(...blueArr) * Math.max(...greenArr);
  });

console.log(result.reduce((sum, num) => sum + num));
