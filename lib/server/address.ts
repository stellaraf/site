import queryString from "query-string";
import {
  type SearchResult,
  formatCity,
  getContextValue,
  isMapboxCity,
  isMapboxSearchResult,
} from "../address-types";

const headers = new Headers({
  "content-type": "application/json",
  accept: "application/json",
  "user-agent": "stellar.tech/lib/server/address",
});

export async function search(
  sessionId: string,
  q: string,
  locationType: string,
): Promise<SearchResult[]> {
  const url = queryString.stringifyUrl({
    url: "https://api.mapbox.com/search/searchbox/v1/suggest",
    query: {
      q,
      types: locationType,
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
  if (locationType === "city") {
    const results: SearchResult[] = data.suggestions.filter(isMapboxCity).map(formatCity);
    return results;
  }
  const results: SearchResult[] = data.suggestions.map(suggestion => ({
    displayName: suggestion.name,
    formValue: getContextValue(suggestion.context),
    description: suggestion.full_address,
  }));
  return results;
}
