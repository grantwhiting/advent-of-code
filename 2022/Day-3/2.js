const fs = require("fs");
const sacks = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

let chunkedSacksArray = [];
for (let i = 0; i < sacks.length; i += 3) {
  const chunk = sacks.slice(i, i + 3);
  chunkedSacksArray.push(chunk.map((x) => x.split("")));
}

const generateAlphabetValueMap = (capital = false) => {
  const obj = {};
  [...Array(26)].forEach((_, i) => {
    obj[String.fromCharCode(i + (capital ? 65 : 97))] = capital
      ? i + 27
      : i + 1;
  });

  return obj;
};

const dupeValues = [];

chunkedSacksArray.forEach((chunk) => {
  const dupes = chunk.reduce((p, c) => p.filter((e) => c.includes(e)));

  dupes[0] === dupes[0].toLowerCase()
    ? dupeValues.push(generateAlphabetValueMap()[dupes[0]])
    : dupeValues.push(generateAlphabetValueMap(true)[dupes[0]]);
});

const total = dupeValues.reduce((a, b) => a + b, 0);

console.log(total);
