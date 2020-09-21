import slugify from 'slugify';

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
