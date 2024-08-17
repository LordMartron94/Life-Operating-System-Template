function calculateHabitProgress(...habitValues) {
  const trueCount = habitValues.filter(value => value === true).length;
  const total = (trueCount / habitValues.length) * 100;
  const result = Math.round(total * 100) / 100; // Round to two decimal places
  return result;
}

// Expose the main function to the formula
module.exports = calculateHabitProgress;
