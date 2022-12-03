const fs = require("fs");
const sacks = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const generateAlphabetValueMap = (capital = false) => {
  const obj = {};
  [...Array(26)].forEach((_, i) => {
    obj[String.fromCharCode(i + (capital ? 65 : 97))] = capital
      ? i + 27
      : i + 1;
  });

  return obj;
};

const separatedSacks = sacks.map((s) => [
  s.slice(0, s.length / 2).split(""),
  s.slice(s.length / 2).split(""),
]);

const dupeValues = [];

separatedSacks.forEach(([s1, s2]) => {
  const dupes = [];
  s1.forEach((x, i) => {
    if (s2.includes(x)) {
      dupes.push(x);
    }
  });

  dupes[0] === dupes[0].toLowerCase()
    ? dupeValues.push(generateAlphabetValueMap()[dupes[0]])
    : dupeValues.push(generateAlphabetValueMap(true)[dupes[0]]);
});

const total = dupeValues.reduce((a, b) => a + b, 0);

console.log(total);
