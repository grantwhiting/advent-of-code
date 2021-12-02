const positionArray = require("./shared");

module.exports = function getPositionWithAim() {
  let depthPos = 0;
  let horizPos = 0;
  let aim = 0;

  positionArray.forEach((pos) => {
    if (pos.direction === "forward") {
      horizPos += parseInt(pos.count);
      depthPos += aim * parseInt(pos.count);
    } else if (pos.direction === "up") {
      aim -= parseInt(pos.count);
    } else if (pos.direction === "down") {
      aim += parseInt(pos.count);
    }
  });

  return depthPos * horizPos;
};
