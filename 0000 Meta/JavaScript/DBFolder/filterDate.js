function filterDate(date) {
  // Parse the input date string into a Date object
  const inputDate = new Date(date);
  
  // Get the current date
  const currentDate = new Date();
  
  // Compare year, month, and day between the input date and current date
  const isSameYear = inputDate.getFullYear() === currentDate.getFullYear();
  const isSameMonth = inputDate.getMonth() === currentDate.getMonth();
  const isSameWeek = (
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    Math.floor((inputDate.getDate() - 1) / 7) === Math.floor((currentDate.getDate() - 1) / 7)
  );

  // Determine the result based on the comparisons
  if (isSameWeek) {
    return "@thisweek"; // In the same week
  }
  if (isSameMonth) {
    return "@thismonth"; // In the same month, but not in the same week
  }
  if (isSameYear) {
    return "@thisyear"; // In the same year, but not necessarily in the same month or week
  }
  
  return "not in this year, month, or week";
}

// Expose the main function to the formula
module.exports = filterDate;
