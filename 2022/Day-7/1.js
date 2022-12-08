const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

function isCdCommand(str) {
  return str.includes("$ cd") && !str.includes("..");
}

function isDotDot(str) {
  return str.includes("..");
}

function isDir(str) {
  return str.includes("dir");
}

function isFile(str) {
  return /\d/.test(str);
}

function getDirName(str, isCd = false) {
  if (isCd) {
    return str.replace("$ cd ", "");
  }
  return str.replace("dir ", "");
}

function getFileName(str) {
  return str.split(" ")[1];
}

function getFileSize(str) {
  return Number(str.split(" ")[0]);
}

const struct = {
  "/": {
    dirSize: 0,
  },
};
let workDir = struct["/"];

data.forEach((d, i) => {
  if (isDir(d)) {
    workDir[getDirName(d)] = { parentDir: workDir, dirSize: 0 };
  } else if (isFile(d)) {
    workDir = Object.assign(workDir, {
      [getFileName(d)]: getFileSize(d),
    });
  } else if (isCdCommand(d)) {
    if (i !== 0) {
      workDir = workDir[getDirName(d, true)];
    }
  } else if (isDotDot(d)) {
    workDir = workDir.parentDir;
  }
});

const markForDeletion = [];

function eachRecursive(obj) {
  for (var k in obj) {
    if (typeof obj[k] == "object" && obj[k] !== null && k !== "parentDir") {
      eachRecursive(obj[k]);
    } else {
      if (k !== "parentDir" && k !== "dirSize") {
        obj.dirSize += obj[k];
      }
      continue;
    }
  }
  if (obj.parentDir) {
    obj.parentDir.dirSize += obj.dirSize;
  }

  if (obj.dirSize <= 100000) {
    markForDeletion.push(obj.dirSize);
  }
}

eachRecursive(struct);
// console.log(struct);
console.log(markForDeletion.reduce((a, b) => a + b));
