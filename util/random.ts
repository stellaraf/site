const idCounter = {};

export const uniqueId = prefix => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === undefined) {
    return `${id}`;
  }

  return `${prefix}${id}`;
};

export function all(...iter: any[]) {
  for (let i of iter) {
    if (!i) {
      return false;
    }
  }
  return true;
}
