export function getStorageValue(field, defaultValue) {
  const item = window.localStorage.getItem(field);
  if (item === null) {
    return defaultValue;
  }

  return item;
}
