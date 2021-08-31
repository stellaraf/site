import type { PageAttrs, PageContent, IDocsGroup } from './content';

export function isPageAttrs(obj: Dict): obj is PageAttrs {
  return 'slug' in obj && !('summary' in obj);
}

export function isPageContent(obj: Dict): obj is PageContent {
  return 'paragraphs' in obj && 'page' in obj;
}

export function isDocsGroups(obj: Dict): obj is IDocsGroup {
  return 'summary' in obj && 'items' in obj;
}

export function notNullUndefined<T extends unknown>(obj: T): obj is NonNullable<T> {
  return typeof obj !== 'undefined' && obj !== null;
}

/**
 * Type Guard to determine if an argument is an object, e.g. `{}` (`Record<string, unknown>`).
 * Maintains type of object if a type argument is provided.
 */
export function isObject<T extends unknown = unknown>(
  obj: unknown,
): obj is { [P in keyof T]: T[P] } {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

/**
 * Type Guard to determine if an object has specified keys, and that the values corresponding to
 * those keys is not `undefined`. The returned type ensures that the keys specified are required
 * and that any keys not specified are optional.
 *
 * @example
 * ```js
 * const obj1 = {one: 1, two: 2};
 * const obj2 = {two: 2, three: 3};
 * console.log(objectHasKeys(obj1, 'one'));
 * // true
 * console.log(objectHasKeys(obj2, 'one'));
 * // false
 * ```
 */
export function objectHasKeys<T, K extends keyof T = keyof T>(
  obj: T,
  ...keys: K[]
): obj is K extends keyof T ? RequiredKeys<T, K> : never {
  for (const key of keys) {
    if (key in obj && typeof obj[key] === 'undefined') {
      return false;
    } else if (!(key in obj)) {
      return false;
    }
  }
  return true;
}
