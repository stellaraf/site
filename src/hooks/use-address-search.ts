import debounce from "p-debounce";
import queryString from "query-string";
import { isSearchError, isSearchResults } from "~/lib";
import type { SelectOptionSingle } from "~/types";

async function queryFn(search: string): Promise<SelectOptionSingle[]> {
  const url = queryString.stringifyUrl({ url: "/api/address-search", query: { search } });
  const res = await fetch(url);
  const data = await res.json();
  if (isSearchError(data)) {
    console.error(data);
    throw new Error(data.error);
  }
  if (isSearchResults(data)) {
    return data.map(d => ({ label: d.name, value: d.address, description: d.address }));
  }
  throw new Error(data);
}

export function useAddressSearch(): (s: string) => Promise<SelectOptionSingle[]> {
  return debounce(queryFn, 1_500);
}
