const fs = require("fs");
let race = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(" ").filter((x) => x !== ""))
  .map((x) => x.slice(1))
  .map((x) => x.join(""));

let raceBreakdown = {
  T: Number(race[0]),
  D: Number(race[1]),
};

const totalRaceTimes = [];

for (let i = 0; i < raceBreakdown.T; i++) {
  totalRaceTimes.push(calculateRaceTime(i, raceBreakdown.T, raceBreakdown.D));
}

function calculateRaceTime(b, rt, d) {
  return b * (rt - b) > d;
}

console.log(totalRaceTimes.filter((x) => x === true).length);
