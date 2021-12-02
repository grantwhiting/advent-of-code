exports.chunky = function (array) {
  return array.map((_, i) => array.slice(i, i + 3));
};

exports.sumChunky = function (array) {
  return array.map((chunk) =>
    chunk.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10))
  );
};
