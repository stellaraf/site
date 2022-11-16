import slugify from "slugify";

export function all<T>(...iter: T[]): boolean {
  for (const i of iter) {
    if (!i) {
      return false;
    }
  }
  return true;
}

export function slug(original: string, parent = "", prefix = "#"): string {
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

export function separate<
  Item extends Record<string, unknown>,
  Key extends keyof Item,
  WithoutKey extends Omit<Item, Key>,
  KeysWithout extends keyof WithoutKey,
  Return extends [Item[Key] | null, Array<{ [K in KeysWithout]: WithoutKey[K] }>],
  Predicate extends (item: unknown) => item is Item[Key],
>(
  items: Array<Item>,
  key: Key,
  predicate: Predicate,
  defaultValue: Return = [null, [] as Array<{ [K in KeysWithout]: WithoutKey[K] }>] as Return,
): Return {
  return items.reduce<Return>((final, item) => {
    if (predicate(item[key])) {
      final[0] = item[key];
    }
    const { [key]: _, ...rest } = item;
    final[1].push(rest as unknown as { [K in KeysWithout]: WithoutKey[K] });
    return final;
  }, defaultValue);
}

/**
 * Extract specified public props from an object, while keeping private props on the object.
 *
 * @example
 * ```ts
 * const before = { one: "one", two: "two", _three: 3 };
 * const after = publicProps(before, "one");
 * console.log(after);
 * // { one: "one", _three: 3 }
 * ```
 */
export function publicProps<
  Props extends Record<string, unknown>,
  All extends string & keyof Props,
  Keep extends string & keyof Props,
  PrivateKeys extends All extends `_${infer S}`
    ? `_${S}`
    : All extends `__${infer S}`
    ? `__${S}`
    : All extends `-${infer S}`
    ? `-${S}`
    : All extends `--${infer S}`
    ? `--${S}`
    : never,
  Kept extends string & (Keep | PrivateKeys),
  Return extends { [K in Kept]: Props[K] },
>(obj: Props, ...keysToKeep: Keep[]): Return {
  const prefixes = ["-", "--", "_", "__"];
  return Object.keys(obj).reduce<Return>((final, key) => {
    for (const keep of keysToKeep) {
      if (keep === key) {
        final[key as Kept] = obj[key] as Return[Kept];
      }
    }
    for (const prefix of prefixes) {
      if (key.startsWith(prefix)) {
        final[key as Kept] = obj[key] as Return[Kept];
      }
    }
    return final;
  }, {} as Return);
}

/**
 * Await a function if it returns a promise, or not, if it doesn't.
 *
 * @param func
 * @param args
 */
export async function awaitIfNeeded<Func extends (...args: never[]) => unknown>(
  func: Func,
  ...args: Parameters<Func>
): Promise<ReturnType<Func>> {
  if (typeof func !== "function") {
    throw new Error("First argument to awaitIfNeeded must be a function");
  }
  let result;
  const initial = func(...args);
  if (initial instanceof Promise) {
    result = await initial;
  } else {
    result = initial;
  }
  return result;
}

export async function messageFromResponseOrError(response: Error | Response): Promise<string> {
  let message = `Failed to parse message from ${String(response)} (type ${typeof response})`;
  if (response instanceof Error) {
    message = response.message;
  } else {
    message = await response.text();
    try {
      const parsed = JSON.parse(message);
      if (typeof parsed === "object" && parsed !== null && "error" in parsed) {
        message = parsed.error;
      } else {
        message = JSON.stringify(parsed, null, 2);
      }
    } catch (error) {
      message = response.statusText;
    }
  }
  return message;
}

export function parseCookie(
  value: string,
): Record<string, string | undefined | null | number | boolean> {
  return value
    .split(";")
    .map(pair => pair.split("="))
    .reduce<Record<string, string | undefined | null | number | boolean>>((final, [k, v]) => {
      const key = decodeURIComponent(k.trim());
      let value: string | string | undefined | null | number | boolean = decodeURIComponent(
        v.trim(),
      );
      if (value === "" || value.toLowerCase() === "undefined") {
        value = undefined;
      } else if (value.toLowerCase() === "null") {
        value = null;
      } else if (value.toLowerCase() === "false") {
        value = false;
      } else if (value.toLowerCase() === "true") {
        value = true;
      } else if (value.match(/^[0-9]+$/)) {
        value = parseInt(value);
      }
      final[key] = value;
      return final;
    }, {});
}
