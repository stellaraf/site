import slugify from "slugify";

export function all<T>(...iter: T[]): boolean {
  for (const i of iter) {
    if (!i) {
      return false;
    }
  }
  return true;
}

export function slug(original: string, parent: string = "", prefix: string = "#"): string {
  let result = "";
  if (typeof original === "string") {
    const slugged = slugify(original, { lower: true });
    if (parent && parent.charAt(0) !== "/") {
      parent = `/${parent}`;
    }
    result = [parent, slugged].join(prefix);
  }
  return result;
}

/**
 * Build an object usable by a select element from a single display name string.
 */
export function buildSelections(opt: string): { value: string; label: string } {
  const value = opt.toLowerCase().replaceAll(/[^A-Za-z0-9-_]/g, "_");
  return { value, label: opt };
}

/**
 * Strictly typed version of `Object.entries()`.
 */
export function entries<O extends Record<string, unknown>, K extends keyof O = keyof O>(
  obj: O,
): [K, O[K]][] {
  const _entries = [] as [K, O[K]][];
  const keys = Object.keys(obj) as K[];
  for (const key of keys) {
    _entries.push([key, obj[key]]);
  }
  return _entries;
}

/**
 * Remove properties from an object by key.
 *
 * @param obj Original object.
 * @param remove Keys to remove.
 * @returns Object without properties defined in `remove`.
 *
 * @example
 * ```
 * const original = { one: 1, two: 2, three: 3 };
 * console.log(removeProps(obj, 'one'));
 * //=> { two: 2, three: 3 }
 * ```
 */
export function removeProps<O extends Record<string, unknown>, R extends keyof O = keyof O>(
  obj: O,
  ...remove: R[]
): Pick<O, Exclude<keyof O, R>> {
  // Keys of `obj` without keys from `remove`.
  type KeyType = Exclude<keyof O, R>;
  // `obj` without properties in `remove`.
  type ReconstructedType = Pick<O, KeyType>;
  // Values of `obj` without keys from `remove`.
  type ValueType = ReconstructedType[KeyType];

  // New object.
  const reconstructed = {} as ReconstructedType;

  for (const [key, value] of entries<O, keyof O>(obj)) {
    if (!remove.includes(key as R)) {
      // If this key isn't contained in `removed`, re-add it to the new object.
      reconstructed[key as KeyType] = value as ValueType;
    }
  }
  return reconstructed;
}

/**
 * Pick a random element from an array.
 */
export function randomArrayItem<T>(arr: T[]): T {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export function sortByWeight<O extends { sortWeight?: number }>(prev: O, next: O): number {
  const { sortWeight: prevWeight = 999 } = prev;
  const { sortWeight: nextWeight = 999 } = next;
  return prevWeight - nextWeight;
}

export function stringSorter<O extends Empty>(prop: string) {
  return (prev: O, next: O): number => {
    const a = prev[prop as keyof O];
    const b = next[prop as keyof O];
    if (typeof a === "string" && typeof b === "string") {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    }
    console.warn(`object ${JSON.stringify(prev)} does not have property '${prop}'`);
    return 0;
  };
}

export function sortByTitle<O extends { title: string }>(prev: O, next: O): number {
  const { title: prevTitle } = prev;
  const { title: nextTitle } = next;
  return prevTitle.toLowerCase() > nextTitle.toLowerCase() ? 1 : -1;
}

export function getErrorMessage(thrown: unknown): string {
  let message = "An unknown error occurred";
  if (thrown instanceof Error) {
    message = thrown.message;
    ("");
  } else if (
    typeof thrown === "object" &&
    thrown !== null &&
    "toString" in thrown &&
    typeof thrown.toString === "function"
  ) {
    message = thrown.toString();
  }
  return message;
}
