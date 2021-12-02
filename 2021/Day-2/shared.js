const str = require("./data");

const array = str.split(/(?<=[0-9])/);
const trimmedArray = array.map((x) => x.trim());

const positionArray = [];

trimmedArray.forEach((item) => {
  const [a, b] = item.split(" ");
  positionArray.push({
    direction: a,
    count: b,
  });
});

module.exports = positionArray;
