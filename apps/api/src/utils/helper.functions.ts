// clean the user json object (remove keys which is undefined)
export function removeUndefined<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
}

//function to remove  the whitespaces from the given string then convert it into lowercase characters string
export function makeLowerCase(s: string) {
  return s.trim().toLowerCase();
}

// function to remove extra spaces
export function removeExtraSpaces(s: string) {
  return s.trim();
}

// function to clean nested object
export function cleanNestedObject(data: any): any {
  if (data == null) return data;
  if (typeof data === "string") {
    return data.trim();
  }

  if (Array.isArray(data)) {
    return data.map((d) => cleanNestedObject(d));
  }
  if (typeof data === "object") {
    const cleanObject: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        cleanObject[key] = cleanNestedObject(data[key]);
      }
    }
    return cleanObject;
  }

  return data;
}

// convert string into array
export function convertIntoArray(str:string){
  if(!str) return null
  return str.split(",").map((s)=>s.trim())
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

export function cleanString(s: string) {
  if (!s) return [];
  return s
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}
