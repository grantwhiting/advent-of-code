const fs = require("fs");
const graph = {};
fs.readFileSync("./data.txt", "utf-8")
  .split(/\n/)
  .forEach((x) => {
    const [from, to] = x.split("-");
    if (!graph[from]) {
      graph[from] = [];
    }
    if (!graph[to]) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(from);
  });

class CaveSystem {
  constructor(keys) {
    this.keys = keys;
    this.adjMap = new Map();
    this.visited = [];
    this.paths = [];

    keys.forEach((key) => this.adjMap.set(key, []));
  }

  isSmallCave(string) {
    return /[a-z]/.test(string);
  }

  addEdge(s, e) {
    this.adjMap.set(s, [...e]);
  }

  callDPS(cave, end) {
    this.depthFirstSearch(cave, end, this.visited);
  }

  depthFirstSearch(cave, end, visited, visitedTwice) {
    visited.push(cave);
    if (cave === end) {
      this.paths.push(this.visited.join(","));
      return;
    }

    for (let i = 0; i < this.adjMap.get(cave).length; i++) {
      const next = this.adjMap.get(cave)[i];
      if (next === "start") {
        continue;
      }
      if (this.isSmallCave(next) && visited.includes(next)) {
        if (visitedTwice) {
          continue;
        }
        if (visited.filter((x) => x === next).length >= 2) {
          continue;
        }
        this.depthFirstSearch(next, end, visited, true);
      } else {
        this.depthFirstSearch(next, end, visited, visitedTwice);
      }
      this.visited.splice(this.visited.indexOf(next), 1);
    }
  }
}

const cs = new CaveSystem(Object.keys(graph).map((key) => key));

// add edges
for (const key in graph) {
  cs.addEdge(key, graph[key]);
}

cs.callDPS("start", "end");
console.log(cs.paths.length);
