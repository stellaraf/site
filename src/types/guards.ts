export function notNullUndefined<T>(obj: T): obj is NonNullable<T> {
  return typeof obj !== "undefined" && obj !== null;
}
