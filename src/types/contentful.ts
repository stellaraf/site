import type { Entry, EntryCollection } from "contentful";

export type ParsedEntry<T> = Entry<T>;

export type ContentType<T> = EntryCollection<T>;

export type { Entry, EntryCollection } from "contentful";
