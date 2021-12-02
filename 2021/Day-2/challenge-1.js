const positionArray = require("./shared");

module.exports = function getPosition() {
  let depthPos = 0;
  let horizPos = 0;

  positionArray.forEach((pos) => {
    if (pos.direction === "forward") {
      horizPos += parseInt(pos.count);
    } else if (pos.direction === "up") {
      depthPos -= parseInt(pos.count);
    } else if (pos.direction === "down") {
      depthPos += parseInt(pos.count);
    }
  });

  return depthPos * horizPos;
};
