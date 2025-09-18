// clean the json object
export function removeUndefined<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
}

// convert string into lowercase characters
export function makeLowerCase(s: string) {
  return s.trim().toLowerCase();
}

// remove extra spaces
export function removeExtraSpaces(s: string) {
  return s.trim();
}
