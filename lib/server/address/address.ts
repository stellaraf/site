import queryString from "query-string";
import { isMapboxSearchResult } from "../../address-types";

import type { SearchResult } from "../../address-types";

const headers = new Headers({
  "content-type": "application/json",
  accept: "application/json",
  "user-agent": "stellar.tech/lib/server/address",
});

export async function search(q: string, sessionId: string): Promise<SearchResult[]> {
  const url = queryString.stringifyUrl({
    url: "https://api.mapbox.com/search/searchbox/v1/suggest",
    query: {
      q,
      access_token: process.env.MAPBOX_TOKEN,
      session_token: sessionId,
    },
  });
  const res = await fetch(url, { headers, method: "GET" });
  if (res.status != 200) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  if (!isMapboxSearchResult(data)) {
    console.error(data);
    throw new Error("data does not conform to expected format");
  }
  const results: SearchResult[] = data.suggestions.map(suggestion => ({
    address: suggestion.full_address,
    name: suggestion.name,
  }));
  return results;
}
