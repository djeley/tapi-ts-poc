export function jsonReplacer(key, value) {
  // Remove attributes with null values from json api responses.
  if (value === null) {
    return undefined;
  }
  // Remove the vehicleId attribute from json api responses.
  if (key === 'vehicleId') {
    return undefined;
  }
  return value;
}