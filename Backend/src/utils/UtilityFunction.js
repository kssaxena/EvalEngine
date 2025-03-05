export function getRandomIndex(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Invalid array");
  }
  return Math.floor(Math.random() * arr.length);
}
