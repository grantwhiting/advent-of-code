import str from "./data";

const array = str.split(" ");

export default function timesNumberIncreases(array) {
  let count = 0;
  array.forEach((x, i) => {
    if (parseInt(array[i + 1], 10) > parseInt(x, 10)) {
      count++;
    }
  });

  return count;
}

console.log(timesNumberIncreases(array));
