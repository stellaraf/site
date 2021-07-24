import slugify from 'slugify';

export function all<T extends unknown>(...iter: T[]): boolean {
  for (const i of iter) {
    if (!i) {
      return false;
    }
  }
  return true;
}

export function slug(original: string, parent: string = '', prefix: string = '#'): string {
  let result = '';
  if (typeof original === 'string') {
    const slugged = slugify(original, { lower: true });
    if (parent && parent.charAt(0) !== '/') {
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
  const value = opt.toLowerCase().replaceAll(/[^A-Za-z0-9-_]/g, '_');
  return { value, label: opt };
}

export function entries<O extends Record<string | number | symbol, unknown>>(
  obj: O,
): [keyof O, O[keyof O]][] {
  const _entries = [] as [keyof O, O[keyof O]][];
  const keys = Object.keys(obj) as (keyof O)[];
  for (const key of keys) {
    _entries.push([key, obj[key]]);
  }
  return _entries;
}
