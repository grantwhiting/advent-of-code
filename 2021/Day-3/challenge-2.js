const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

const convertToArrayOfEachIdx = (idx) => data.map((x) => parseInt(x[idx]));

const transformedArray = [...Array(data[0].length).keys()].map((_, i) =>
  convertToArrayOfEachIdx(i)
);

const isOne = (array) =>
  array.reduce((curr, next) => curr + next) > array.length / 2;

const filterByOnes = transformedArray.map((x) => (isOne(x) ? 1 : 0));
const filterByZeros = transformedArray.map((x) => (isOne(x) ? 0 : 1));

function getValue(array, filterBy, idx = 0) {
  const filter = filterBy === 1 ? filterByOnes : filterByZeros;
  let filteredArray = [];

  const arrayOfOnes = [];
  const arrayOfZeros = [];

  // take 1 if equal number of 1s and 0s
  array.forEach((item) => {
    if (parseInt(item[idx]) === 1) {
      arrayOfOnes.push(1);
    } else {
      arrayOfZeros.push(0);
    }
  });

  if (arrayOfOnes.length === arrayOfZeros.length) {
    filteredArray = array.filter((x) => parseInt(x[idx], 10) === filterBy);
  } else {
    filteredArray = array.filter((x) => parseInt(x[idx], 10) === filter[idx]);
  }

  if (!filteredArray.length) {
    filteredArray = array;
  }

  if (filteredArray.length === 1) {
    return parseInt(filteredArray[0], 2);
  }

  return getValue(filteredArray, filterBy, idx + 1);
}

console.log(getValue(data, 1) * getValue(data, 0));
