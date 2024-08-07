import type { IncomingHttpHeaders } from "http";

type WithEntries = { entries: () => IterableIterator<[string, string]> };

type SerializedKey<T> = T extends `_${string}` ? never : T extends string ? T : never;

type SerializedValue<T> = T extends string | number | boolean | null | undefined
  ? T
  : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    T extends (...args: any[]) => any
    ? never
    : T extends Array<infer A>
      ? Array<SerializedValue<A>>
      : T extends Set<infer S>
        ? Array<SerializedValue<S>>
        : T extends WithEntries
          ? Record<string, string>
          : T extends Map<infer MK, infer MV>
            ? Record<MK & string, MV>
            : T extends IncomingHttpHeaders
              ? Record<string, string | string[]>
              : T extends Record<infer RK, infer RV>
                ? Record<RK, SerializedNever<RV>>
                : never;

type SerializedNever<T, Key extends keyof T & string = keyof T & string> = {
  [K in SerializedKey<Key>]: SerializedValue<T[K]>;
};

export type Serialized<T, ST extends SerializedNever<T> = SerializedNever<T>> = {
  [K in keyof ST as ST[K] extends never ? never : K]: ST[K];
};

export function serializeUrl(url: URL): Omit<Serialized<URL>, "username" | "password"> {
  const {
    port,
    hash,
    host,
    href,
    search,
    origin,
    pathname,
    protocol,
    hostname,
    searchParams: searchParamsObj,
  } = url;
  const searchParams = Object.fromEntries(searchParamsObj.entries());
  return { pathname, port, protocol, search, hash, searchParams, host, hostname, href, origin };
}
