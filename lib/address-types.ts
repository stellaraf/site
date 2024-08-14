export interface SearchResult {
  address: string;
  name: string;
}

export interface SearchError {
  error: string;
}

export function isSearchError(data: unknown): data is SearchError {
  return (
    typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
  );
}

export function isSearchResults(data: unknown): data is SearchResult[] {
  if (Array.isArray(data) && data.length !== 0) {
    return (
      typeof data[0] === "object" &&
      data[0] !== null &&
      "address" in data[0] &&
      "name" in data[0] &&
      typeof data[0].address === "string" &&
      typeof data[0].name === "string"
    );
  }
  return Array.isArray(data);
}

export function isMapboxSearchResult(data: unknown): data is MapboxSearchResult {
  return (
    typeof data === "object" &&
    data !== null &&
    "attribution" in data &&
    "response_id" in data &&
    "suggestions" in data &&
    Array.isArray(data.suggestions)
  );
}

export function isMapboxCity(data: Suggestion): boolean {
  return data.feature_type === "place";
}

export function formatCity(data: Suggestion): SearchResult {
  const name = [data.name, data.context.region.region_code].join(", ");
  let addressParts: string[] = [];
  if (typeof data.context.district !== "undefined") {
    addressParts = [...addressParts, data.context.district.name];
  }
  addressParts = [...addressParts, data.context.region.name, data.context.country.name];
  const address = addressParts.join(", ");
  return { name, address };
}

export interface MapboxSearchResult {
  attribution: string;
  response_id: string;
  suggestions: Suggestion[];
}

export interface Suggestion {
  address: string;
  context: Context;
  feature_type: string;
  full_address: string;
  language: string;
  maki: string;
  mapbox_id: string;
  metadata: Dict;
  name: string;
  place_formatted: string;
  brand?: string[];
  brand_id?: string[];
  external_ids?: ExternalIds;
  name_preferred?: string;
  poi_category?: string[];
  poi_category_ids?: string[];
}

export interface Context {
  address?: Address;
  country: Country;
  district?: District;
  place: Place;
  postcode: Postcode;
  region: Region;
  street: Street;
  neighborhood?: Neighborhood;
}

export interface Address {
  address_number: string;
  id?: string;
  name: string;
  street_name: string;
}

export interface Country {
  country_code: string;
  country_code_alpha_3: string;
  id?: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Postcode {
  id: string;
  name: string;
}

export interface Region {
  id?: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

export interface Street {
  id?: string;
  name: string;
}

export interface Neighborhood {
  id: string;
  name: string;
}

export interface ExternalIds {
  safegraph?: string;
  foursquare?: string;
}
