// multiplies by 7 each day
// model each fish individually
// the number of days until it creates a nre fish

/*
So, suppose you have a lanternfish with an internal timer value of 3:

After one day, its internal timer would become 2.
After another day, its internal timer would become 1.
After another day, its internal timer would become 0.
After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.
*/

// if any fish get to 0 then add new fish with 8 on the next day (every time a 6 appears in the list)

// How many fish in 80 days?

const fs = require("fs");
const fishCounters = fs
  .readFileSync("./data.txt", "utf-8")
  .split(",")
  .map(Number);

for (i = 0; i < 80; i++) {
  let idx = 0;
  let currentNumberOfFish = fishCounters.length - 1;
  for (counter of fishCounters) {
    if (counter === 0) {
      fishCounters[idx] = 6;
      fishCounters.push(8);
      idx++;
      continue;
    }

    fishCounters[idx] = counter - 1;

    if (idx === currentNumberOfFish) {
      break;
    }

    idx++;
  }
  // console.log(fishCounters);
}

console.log(fishCounters.length);
