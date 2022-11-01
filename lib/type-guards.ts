export function is<T>(obj: T): obj is NonNullable<T> {
  return typeof obj !== "undefined" && obj !== null;
}
