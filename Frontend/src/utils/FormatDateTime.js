export function formatDateTime(isoString) {
  return `${formatDate(isoString)} ${formatTime(isoString)}`;
}

export function formatTime(isoString) {
  const date = new Date(isoString);

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // If hours is 0, set it to 12

  return `${hours}:${minutes} ${ampm}`;
}

export function formatDate(isoString) {
  const date = new Date(isoString);

  // Extract date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
