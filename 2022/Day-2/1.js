const fs = require("fs");
const rounds = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const CHOICE_KEY = {
  A: "R",
  B: "P",
  C: "S",
  X: "R",
  Y: "P",
  Z: "S",
};

const SCORE_KEY = {
  [CHOICE_KEY.A]: 1,
  [CHOICE_KEY.X]: 1,
  [CHOICE_KEY.B]: 2,
  [CHOICE_KEY.Y]: 2,
  [CHOICE_KEY.C]: 3,
  [CHOICE_KEY.Z]: 3,
};

const WIN_POINTS = 6;
const DRAW_POINTS = 3;

let TOTAL = 0;

rounds.forEach((r) => {
  const [opc, myc] = r.split(" ");
  const MYC = CHOICE_KEY[myc];
  const OPC = CHOICE_KEY[opc];

  switch (true) {
    // DRAW
    case MYC === OPC:
      TOTAL += SCORE_KEY[MYC] + DRAW_POINTS;
      break;
    // WIN
    case (MYC === CHOICE_KEY.X && OPC === CHOICE_KEY.C) ||
      (MYC === CHOICE_KEY.Y && OPC === CHOICE_KEY.A) ||
      (MYC === CHOICE_KEY.Z && OPC === CHOICE_KEY.B):
      TOTAL += SCORE_KEY[MYC] + WIN_POINTS;
      break;
    // LOSE
    case (MYC === CHOICE_KEY.X && OPC === CHOICE_KEY.B) ||
      (MYC === CHOICE_KEY.Y && OPC === CHOICE_KEY.C) ||
      (MYC === CHOICE_KEY.Z && OPC === CHOICE_KEY.A):
      TOTAL += SCORE_KEY[MYC];
      break;
  }
});

console.log(TOTAL);
