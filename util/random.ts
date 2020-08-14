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
