const fs = require("fs");
const elfFood = fs
  .readFileSync("./data.txt", "utf-8")
  .split(/\n\s*\n/)
  .map((x) => x.split(/\n/));

const getTotalCalories = (arr) =>
  arr.reduce((curr, acc) => (curr += Number(acc)), 0);
const totalCaloriesArray = elfFood.map((arr) => getTotalCalories(arr));
const maxCalories = Math.max(...totalCaloriesArray);
console.log(maxCalories);
