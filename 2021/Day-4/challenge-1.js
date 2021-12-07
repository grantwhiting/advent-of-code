const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(/\n\s*\n/);

let calledNumbers;
let bingoCards = [];

data.forEach((capture, idx) => {
  if (idx === 0) {
    calledNumbers = capture.split(",");
  } else {
    bingoCards.push(
      capture.split("\n").map((x) => x.trim().split(" ").filter(String))
    );
  }
});

const summy = (card) =>
  card
    .flat()
    .filter((cell) => cell !== "MARKED")
    .map((cell) => parseInt(cell, 10))
    .reduce((a, b) => a + b);

const winner = (card) => {
  // get card columns
  const columns = card[0].map((_, i) => card.map((x) => x[i]));
  // check card columns or rows for all cells containing "MARKED"
  const cardWins = [...card, ...columns].find((x) =>
    x.every((cell) => cell === "MARKED")
  );

  if (cardWins) {
    return card;
  }
};

for (let number of calledNumbers) {
  let stopLoop = false;
  for (let card of bingoCards) {
    card.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (number === cell) {
          card[i][j] = "MARKED";
        }
      });
    });
    if (winner(card)) {
      console.log(parseInt(number, 10) * summy(card));
      stopLoop = true;
      break;
    }
  }

  if (stopLoop) {
    break;
  }
}
