function calculateTimeTotal(hours, minutes) {
  let result;

  if (hours === 0 && minutes === 0) {
    // Both hour and minute are zero, handle this case as needed.
    result = 0;
  } else {
    // Calculate the result when at least one of them is non-zero.
    result = (hours + (10 * minutes / 60) / 10).toFixed(2);
  }

  return result;
}

module.exports = calculateTimeTotal;