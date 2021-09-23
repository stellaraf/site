export function generateId(name: string): string {
  return name.split(' ').join('-').toLowerCase();
}
