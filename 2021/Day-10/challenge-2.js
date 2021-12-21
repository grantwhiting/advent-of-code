const fs = require("fs");
let charGroups = fs.readFileSync("./data.txt", "utf-8").split(/\n/);
const invalidChunkIndices = require("./challenge-1");

const closeCharGroups = [];

// remove invalid chunks
const incompleteChunks = charGroups.filter(
  (_, i) => !invalidChunkIndices.includes(i)
);

function getMatchingChar(char) {
  switch (char) {
    case "]":
      return "[";
    case ")":
      return "(";
    case "}":
      return "{";
    case ">":
      return "<";
    case "[":
      return "]";
    case "(":
      return ")";
    case "{":
      return "}";
    case "<":
      return ">";
  }
}

for (let i = 0; i < incompleteChunks.length; i++) {
  const unclosedChars = [];
  const closeChars = [];
  for (const char of [...incompleteChunks[i]]) {
    if (["[", "(", "{", "<"].includes(char)) {
      unclosedChars.push(char);
    } else if (["]", ")", "}", ">"].includes(char)) {
      unclosedChars.pop();
    }
  }
  unclosedChars.forEach((char) => closeChars.push(getMatchingChar(char)));
  closeCharGroups.push(closeChars.reverse());
}

function replaceCharWithValue(char) {
  switch (char) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }
}

const total = closeCharGroups
  .map((chars) =>
    chars.map(replaceCharWithValue).reduce((acc, val) => acc * 5 + val, 0)
  )
  .sort((a, b) => a - b);

console.log(total[Math.floor(total.length / 2)]);
