const fs = require("fs");
const csv = require("csv-parser");

const results = [];

(async () => {
  const clipboardy = await import('clipboardy');

  fs.createReadStream("./RNA List emails sunset versions MM-1848.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data.email))
  .on("end", () => {
    const jsonOutput = {
      to: results.map((row) => ({ email: row })),
    };
    clipboardy.write(JSON.stringify(jsonOutput, null, 2));
    console.log("Copied to clipboard!");
  });
})();
