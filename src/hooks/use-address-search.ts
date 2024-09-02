import debounce from "p-debounce";
import queryString from "query-string";
import { useCallback } from "react";
import { isSearchError, isSearchResults } from "~/lib";
import type { LocationType, SelectOptionSingle } from "~/types";

async function queryFn(search: string, locationType: LocationType): Promise<SelectOptionSingle[]> {
  const url = queryString.stringifyUrl({
    url: "/api/address-search",
    query: { search, locationType },
  });
  const res = await fetch(url);
  const data = await res.json();
  if (isSearchError(data)) {
    console.error(data);
    throw new Error(data.error);
  }
  if (isSearchResults(data)) {
    return data.map(d => ({
      label: d.displayName,
      value: JSON.stringify(d.formValue),
      description: d.description,
    }));
  }
  throw new Error(data);
}

export function useAddressSearch(
  locationType: LocationType,
): (s: string) => Promise<SelectOptionSingle[]> {
  const cb = useCallback(
    async (search: string): Promise<SelectOptionSingle[]> => queryFn(search, locationType),
    [locationType],
  );
  return debounce(cb, 1_500);
}
