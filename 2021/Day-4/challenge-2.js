const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(/\n\s*\n/);

let numbers = [];
let boards = {};
let winningBoards = new Set();
let breakLoop = false;
let lastNumber;

data.forEach((capture, i) => {
  if (i === 0) {
    numbers = capture.split(",");
  } else {
    boards = {
      ...boards,
      [`board${i}`]: capture
        .split("\n")
        .map((x) => x.trim().split(" ").filter(String)),
    };
  }
});

const sum = (board) =>
  board
    .flat()
    .filter((cell) => cell !== "MARKED")
    .map((cell) => parseInt(cell, 10))
    .reduce((a, b) => a + b);

const boardIsAWinner = (board) => {
  // get columns
  const columns = board[0].map((_, i) => board.map((x) => x[i]));
  // check if all cells are marked
  for (const row of [...board, ...columns]) {
    if (row.every((cell) => cell === "MARKED")) {
      winningBoards.add(board);

      if (winningBoards.size === Object.keys(boards).length) {
        breakLoop = true;
        break;
      }
    }
  }
};

const markBoard = (board, number) => {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === number) {
        // mark cell
        board[i][j] = "MARKED";
      }
    });
  });
};

for (number of numbers) {
  for (let board in boards) {
    boards[board].forEach((row) => {
      markBoard(boards[board], number);

      boardIsAWinner(boards[board]);
    });

    if (breakLoop) {
      break;
    }
  }

  if (breakLoop) {
    lastNumber = number;
    break;
  }
}

const lastValue = Array.from(winningBoards).pop();
console.log(sum(lastValue) * lastNumber);
