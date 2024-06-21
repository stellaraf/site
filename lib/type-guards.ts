export function isEmptyRichText<T>(obj: T): obj is T {
  if (typeof obj === "object" && obj !== null && "raw" in obj) {
    if (typeof obj.raw === "object" && obj.raw !== null && "children" in obj.raw) {
      if (Array.isArray(obj.raw.children)) {
        if (obj.raw.children.length === 0) {
          return true;
        }
        if (obj.raw.children.length === 1) {
          const child = obj.raw.children[0];
          if (
            typeof child === "object" &&
            child !== null &&
            "children" in child &&
            Array.isArray(child.children)
          ) {
            if (child.children.length === 0) {
              return true;
            }
            if (
              child.children.length === 1 &&
              typeof child.children[0] === "object" &&
              child.children[0] !== null &&
              "text" in child.children[0]
            ) {
              if (child.children[0].text === "") {
                return true;
              }
            }
          }
        }
        return false;
      }
    }
  }
  return false;
}

export function is<T>(obj: T): obj is NonNullable<T> {
  if (isEmptyRichText(obj)) {
    return false;
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).length >= 1;
  }
  return typeof obj !== "undefined" && obj !== null;
}
