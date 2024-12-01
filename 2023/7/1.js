const fs = require("fs");
const data = fs.readFileSync("./sample.txt", "utf-8").split(/\n/);

const filteredData = {};

data.forEach((pair) => {
  const [key, value] = pair.split(" ");
  filteredData[key] = value;
});

const pointMap = {
  FiveOfAKind: 6,
  FourOfAKind: 5,
  FullHouse: 4,
  ThreeOfAKind: 3,
  TwoPair: 2,
  OnePair: 1,
  HighCard: 0,
};

function countOccurrences(arr, searchStr) {
  return arr.reduce((acc, curr) => (curr === searchStr ? acc + 1 : acc), 0);
}

function hasExactlyNMatches(arr, n) {
  const itemCounts = {};

  // Count occurrences of each item in the array
  arr.forEach(item => {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  });

  // Check if any item has exactly n occurrences
  return Object.values(itemCounts).some(count => count === n);
}

function findMatchedSets(hands) {
  const matchedSets = {};

  for (const key in hands) {
    hands[key].forEach((x) => {
      matchedSets[key] = {
        ...matchedSets[key],
        ...{ [x]: countOccurrences(hands[key], x) },
      };
    });

    // assign a score to each hand
    switch (true) {
      case matchedSets[key][0] === 5:
        matchedSets[key]["score"] = pointMap["FiveOfAKind"];
      case matchedSets[key]
    }
  }

  return matchedSets;
}

// find order of hands

const arrays = {
  "32T3K": ["3", "2", "T", "3", "K"],
  T55J5: ["T", "5", "5", "J", "5"],
  KK677: ["K", "K", "6", "7", "7"],
  KTJJT: ["K", "T", "J", "J", "T"],
  QQQJA: ["Q", "Q", "Q", "J", "A"],
};

const result = findMatchedSets(arrays);
console.log(result);
