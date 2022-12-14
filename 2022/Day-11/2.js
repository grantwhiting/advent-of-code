const fs = require("fs");
const matcher = /\d+/g;

let monos = fs
  .readFileSync("./data.txt", "utf-8")
  .split("\n\n")
  .map((m) => m.split("\n"));

const modulo = monos.reduce((prev, mono) => prev * mono[3].match(matcher), 1);

function performOperation(str) {
  switch (true) {
    case str.includes("+"):
      return (a, b) => a + b;
    case str.includes("-"):
      return (a, b) => a - b;
    case str.includes("*"):
      return (a, b) => a * b;
    default:
      return (a, b) => a / b;
  }
}

monos = monos.map((m) => ({
  name: m[0].match(matcher)[0],
  items: m[1].match(matcher).map(Number),
  inspectedCount: 0,
  inspect: function () {
    const lastItem = m[2].split(" ")[m[2].split(" ").length - 1];
    const squared = lastItem.match("old") !== null;
    this.items = this.items.map((item) => {
      this.inspectedCount++;
      return Math.floor(
        performOperation(m[2])(
          item,
          squared ? item : Number(m[2].match(matcher)[0])
        ) % modulo
      );
    });
  },
  test: function () {
    this.items.forEach((item) => {
      const divisible = item % Number(m[3].match(matcher)[0]) === 0;
      if (divisible) {
        this.T(item);
      } else {
        this.F(item);
      }
    });
  },
  T: function (item) {
    const receivingMono = m[4].match(matcher)[0];
    monos[receivingMono].items.push(item);
  },
  F: function (item) {
    const receivingMono = m[5].match(matcher)[0];
    monos[receivingMono].items.push(item);
  },
  removeOldItems: function () {
    this.items.splice(0, this.items.length);
  },
}));

[...Array(10000)].forEach(() => {
  monos.forEach((mono) => {
    // inspect
    mono.inspect();
    // test
    mono.test();
    // remove
    mono.removeOldItems();
  });
});

const inspected = monos.map((m) => m.inspectedCount).sort((a, b) => b - a);
const [mono1, mono2] = inspected;
console.log(mono1 * mono2);
