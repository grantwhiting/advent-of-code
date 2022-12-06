const fs = require("fs");
const chars = fs.readFileSync("./data.txt", "utf-8");

for (let i = 0; i < chars.length; i++) {
  const count = 4;
  const uniqueChars = new Set();
  const chunk = chars.slice(i, i + count);

  chunk.split("").forEach((x) => uniqueChars.add(x));

  if (uniqueChars.size === count) {
    console.log(i + count);
    break;
  }
}
