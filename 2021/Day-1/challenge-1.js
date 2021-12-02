module.exports = function timesNumberIncreases(array) {
  let count = 0;
  array.forEach((x, i) => {
    if (parseInt(array[i + 1], 10) > parseInt(x, 10)) {
      count++;
    }
  });

  return count;
};
