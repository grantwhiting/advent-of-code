const str = require("./data");
const { sumChunky, chunky } = require("./challenge-2");
const timesNumberIncreases = require("./challenge-1");

const array = str.split(" ");

console.log(timesNumberIncreases(array));
console.log(timesNumberIncreases(sumChunky(chunky(array))));
