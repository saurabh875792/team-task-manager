// date format (YYYY-MM-DD → readable)
export const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};

// truncate long text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

// capitalize first letter
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// check overdue task
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};