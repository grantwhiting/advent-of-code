const fs = require("fs");
const input = fs.readFileSync("./data.txt", "utf-8");
const map = input.split(/\n/).map((el) => el.split(""));

let guard;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] === "^") {
      guard = { x, y };
    }
  }
}

const mapLimits = {
  xLimit: map[0].length - 2,
  yLimit: map.length - 2,
};

function walk(dir, x, y) {
  if (dir === "up") {
    if (pathIsObstructed(x, y - 1)) {
      return walk("right", x, y);
    }

    map[y][x] = "💪";
    y--;
    map[y][x] = "✅";
    dir = "up";
  }

  if (dir === "right") {
    if (pathIsObstructed(x + 1, y)) {
      return walk("down", x, y);
    }

    map[y][x] = "💪";
    x++;
    map[y][x] = "✅";
    dir = "right";
  }

  if (dir === "down") {
    if (pathIsObstructed(x, y + 1)) {
      return walk("left", x, y);
    }

    map[y][x] = "💪";
    y++;
    map[y][x] = "✅";
    dir = "down";
  }

  if (dir === "left") {
    if (pathIsObstructed(x - 1, y)) {
      return walk("up", x, y);
    }

    map[y][x] = "💪";
    x--;
    map[y][x] = "✅";
    dir = "left";
  }

  if (x > mapLimits.xLimit || y > mapLimits.yLimit) {
    return;
  }

  return walk(dir, x, y);
}

function pathIsObstructed(x, y) {
  return map[y][x] === "#";
}

walk("up", guard.x, guard.y);

const numberOfSteps = map.flatMap((m) => m.filter((el) => el === "💪")).length;
console.log(numberOfSteps + 1);
