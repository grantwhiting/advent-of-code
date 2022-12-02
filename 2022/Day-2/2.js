const fs = require("fs");
const rounds = fs.readFileSync("./data.txt", "utf-8").split(/\n/);

const CHOICE_KEY = {
  A: "R",
  B: "P",
  C: "S",
};

const SCORE_KEY = {
  [CHOICE_KEY.A]: 1,
  [CHOICE_KEY.B]: 2,
  [CHOICE_KEY.C]: 3,
};

const OUTCOME_KEY = {
  X: "L",
  Y: "D",
  Z: "W",
};

const WIN_POINTS = 6;
const DRAW_POINTS = 3;

let TOTAL = 0;

rounds.forEach((r) => {
  const [opc, out] = r.split(" ");
  const OPC = CHOICE_KEY[opc];
  const OUT = OUTCOME_KEY[out];

  switch (true) {
    // DRAW
    case OUT === OUTCOME_KEY.Y:
      TOTAL += SCORE_KEY[OPC] + DRAW_POINTS;
      break;
    // WIN
    case OUT === OUTCOME_KEY.Z:
      if (OPC === CHOICE_KEY.A) {
        TOTAL += SCORE_KEY[CHOICE_KEY.B];
      } else if (OPC === CHOICE_KEY.B) {
        TOTAL += SCORE_KEY[CHOICE_KEY.C];
      } else if (OPC === CHOICE_KEY.C) {
        TOTAL += SCORE_KEY[CHOICE_KEY.A];
      }
      TOTAL += WIN_POINTS;
      break;
    // LOSE
    case OUT === OUTCOME_KEY.X:
      if (OPC === CHOICE_KEY.A) {
        TOTAL += SCORE_KEY[CHOICE_KEY.C];
      } else if (OPC === CHOICE_KEY.B) {
        TOTAL += SCORE_KEY[CHOICE_KEY.A];
      } else if (OPC === CHOICE_KEY.C) {
        TOTAL += SCORE_KEY[CHOICE_KEY.B];
      }
      break;
  }
});

console.log(TOTAL);
