const fs = require("fs");
let race = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .map((x) => x.split(" ").filter((x) => x !== ""))
  .map((x) => x.slice(1));

let raceBreakdown = [];

race[0].forEach((time, i) => {
  raceBreakdown.push({
    T: Number(time),
    D: Number(race[1][i]),
    uId: Math.random(),
  });
});

const totalRaceTimes = [];

raceBreakdown.forEach((r) => {
  for (let i = 0; i < r.T; i++) {
    totalRaceTimes.push({
      [r.uId]: calculateRaceTime(i, r.T, r.D),
    });
  }
});

function calculateRaceTime(b, rt, d) {
  return b * (rt - b) > d;
}

const combinedObject = totalRaceTimes.reduce((result, obj) => {
  const key = Object.keys(obj)[0];
  if (!result[key]) {
    result[key] = [];
  }
  result[key].push(obj[key]);
  return result;
}, {});

const totalWinningRaces = Object.values(combinedObject)
  .map((co) => {
    return co.filter((b) => b === true);
  })
  .map((x) => x.length)
  .reduce((acc, curr) => acc * curr);

console.log(combinedObject);
console.log(totalWinningRaces);
