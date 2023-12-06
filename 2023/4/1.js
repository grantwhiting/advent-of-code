const fs = require("fs");
const scoreCards = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const getNumbers = (str, regex) => {
  const match = str.match(regex);
  if (match) {
    return match[1]
      .split(/\s+/)
      .filter((x) => x !== "")
      .map(Number);
  }
};

const parsedScoreCardData = scoreCards.map((sc) => ({
  winningNumbers: getNumbers(sc, new RegExp(/Card\s* \d*: (\d*(?:\s\d*)*) \|/)),
  myNumbers: getNumbers(sc, new RegExp(/\| (\d*(?:\s\d*)*)/)),
}));

let totalNumbersInBothLists = [];

totalNumbersInBothLists = parsedScoreCardData.map((d) => {
  const numbersInBothLists = [];
  d.winningNumbers.forEach((wn) => {
    if (d.myNumbers.includes(wn)) {
      numbersInBothLists.push(wn);
    }
  });
  return numbersInBothLists;
});

const totalScores = totalNumbersInBothLists.map((t) => {
  return t.reduce((acc, curr, i) => {
    if (t.length === 0) {
      return 0;
    }

    if (t.length === 1) {
      return 1;
    }

    if (i === 0) {
      return 1;
    }

    return acc * 2;
  }, 0);
});

console.log(totalScores.reduce((total, score) => total + score));
