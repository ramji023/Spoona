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

export function cleanArrayObjects<T extends Record<string, any>>(
  arr: T[]
): T[] {
  const cleanValue = (value: any): any => {
    if (typeof value === "string") {
      // remove leading/trailing + extra internal spaces
      return value.trim().replace(/\s+/g, " ");
    } else if (Array.isArray(value)) {
      return value.map(cleanValue);
    } else if (value && typeof value === "object") {
      return cleanObject(value);
    }
    return value;
  };

  const cleanObject = (obj: Record<string, any>): Record<string, any> => {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = cleanValue(obj[key]);
      }
    }
    return newObj;
  };

  return arr.map(cleanObject) as T[];
}

export function cleanArray(tags: string[]) {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0);
}
