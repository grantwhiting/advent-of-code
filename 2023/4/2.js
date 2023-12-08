const fs = require("fs");
const scoreCards = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const cardCounts = scoreCards.reduce((obj, curr, i) => {
  return (obj = { ...obj, ...{ [i + 1]: 0 } });
}, {});

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

const totalWinningNumbers = parsedScoreCardData.map((d) => {
  const numbersInBothLists = [];
  d.winningNumbers.forEach((wn) => {
    if (d.myNumbers.includes(wn)) {
      numbersInBothLists.push(wn);
    }
  });
  return numbersInBothLists;
});

const getCardCopyCount = (card, cardIndex) => {
  cardIndex++;
  // add to count of current card
  cardCounts[cardIndex] += 1;
  const currentCell = cardCounts[cardIndex];

  // get card copies
  card.forEach((number) => {
    cardIndex++;
    cardCounts[cardIndex] += currentCell;
  });
};

totalWinningNumbers.forEach(getCardCopyCount);

console.log(Object.values(cardCounts).reduce((curr, next) => curr + next, 0));
