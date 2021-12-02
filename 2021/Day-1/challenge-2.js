import str from "./data";
import timesNumberIncreases from "./challenge-1";

const array = str.split(" ");

function chunky(array) {
  return array.map((_, i) => array.slice(i, i + 3));
}

function sumChunky(array) {
  return array.map((chunk) =>
    chunk.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10))
  );
}

console.log(timesNumberIncreases(sumChunky(chunky(array))));
