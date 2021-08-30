import type { Entry, EntryCollection } from 'contentful';

export type ParsedEntry<T> = Entry<T>;

export type ContentType<T> = EntryCollection<T>;

/**
 * Insanely complicated way of deeply inferring a Contentful Entry. Should correspond to the
 * _actual_ return type of `ContentfulClientApi.parseEntries()`.
 */
export type DeepEntry<T> = T extends Entry<infer E>
  ? E
  : T extends Array<infer A>
  ? Array<DeepEntry<A>>
  : T extends Record<string, infer R>
  ? DeepEntry<R>
  : Entry<
      {
        [K in keyof T]: T[K] extends Array<infer A>
          ? Array<DeepEntry<A>>
          : T[K] extends Record<string, infer R>
          ? DeepEntry<R>
          : T[K] extends infer V
          ? V
          : never;
      }
    >;

interface PartialEntryCollection<T> {
  items: Array<DeepEntry<T>>;
}

export type DeepEntryCollection<T> = Omit<EntryCollection<T>, 'items'> & PartialEntryCollection<T>;

export type { Entry, EntryCollection } from 'contentful';
