function getState(stage, doDate, dueDate) {
  const now = new Date();
  const dueDateObj = dueDate ? new Date(dueDate) : null;
  const doDateObj = doDate ? new Date(doDate) : null;

  // Check if the stage is "Done"
  if (stage === "Done") {
    return "⚪"; // White
  }

  // Check if the Due Date is today
  if (dueDateObj && dueDateObj.toDateString() === now.toDateString()) {
    return "🟢"; // Green
  }

  // Check if the Due Date is in the future
  if (dueDateObj && dueDateObj > now) {
    return "🔵"; // Blue
  }

  // Check if the Due Date has passed
  if (dueDateObj && dueDateObj < now) {
    return "🔴"; // Red
  }

  // Check if the Do Date is in the future
  if (doDateObj && doDateObj > now) {
    return "🟡"; // Yellow
  }

  // Check if the Do Date has passed
  if (doDateObj && doDateObj < now) {
    return "🟠"; // Orange
  }

  // Check if the Do Date is today
  if (doDateObj && doDateObj.toDateString() === now.toDateString()) {
    return "🟣"; // Purple
  }

  // If neither Due Date nor Do Date is set
  return "⚫"; // Black
}

// Expose the main function to the formula
module.exports = getState;
