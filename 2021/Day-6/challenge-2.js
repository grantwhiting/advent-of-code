// break up the data

const fs = require("fs");
let fish = fs.readFileSync("./data.txt", "utf-8").split(",").map(Number);

// create queue
const queue = Array(9).fill(0);

fish.forEach((f) => {
  queue[f]++;
});

for (let i = 0; i < 80; i++) {
  // remove first item from queue
  const currentFish = queue.shift();
  // re-add first item to end of queue
  queue.push(currentFish);

  queue[6] += currentFish;
}

console.log(queue.reduce((a, b) => a + b));
