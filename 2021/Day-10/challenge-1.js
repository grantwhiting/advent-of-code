const fs = require("fs");
const charGroups = fs.readFileSync("./data.txt", "utf8").split(/\n/);

// last item you put in is the first item you check

// make an empty stack
// for each character in the input
// 1. if it's an open bracket put it on the stack
// 2. if it's a close bracket check the top of the stack
//    1. if the stack is empty you've got an invalid expression - exit
//    2. if the top of the stack doesn't match your bracket it's invalid - exit
//    3. if the top of the stack does match your bracket pop it off the stack and keep going

const invalidChars = [];
const invalidChunkIndices = [];

function getMatchingChar(closingChar) {
  switch (closingChar) {
    case "]":
      return "[";
    case ")":
      return "(";
    case "}":
      return "{";
    default:
      return "<";
  }
}

function replaceCharWithValue(char) {
  switch (char) {
    case "]":
      return 57;
    case ")":
      return 3;
    case "}":
      return 1197;
    default:
      return 25137;
  }
}

for (let i = 0; i < charGroups.length; i++) {
  const stack = [];
  for (const char of [...charGroups[i]]) {
    if (["[", "(", "{", "<"].includes(char)) {
      stack.push(char);
    } else if (["]", ")", "}", ">"].includes(char)) {
      const lastChar = stack.pop();
      if (stack.length < 1) {
        break;
      } else if (lastChar !== getMatchingChar(char)) {
        invalidChars.push(char);
        invalidChunkIndices.push(i);
        break;
      }
    }
  }
}

console.log(invalidChars.map(replaceCharWithValue).reduce((a, b) => a + b));

module.exports = invalidChunkIndices;
