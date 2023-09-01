import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/office-locations.gql";

import type { LocationTime } from "~/lib/server";
import type { OfficeLocationsQuery, OfficeLocationsQueryVariables } from "~/types";

export type OfficeLocations = NonNullable<OfficeLocationsQuery["officeLocations"]>;
export type OfficeLocation = ArrayElement<OfficeLocations>;
export type Address = Omit<OfficeLocation["address"], "__typename">;
export type OfficeLocationWithTimezone = OfficeLocation & LocationTime;

export default async function (): Promise<OfficeLocations> {
  const result = await queryFn<OfficeLocationsQuery, OfficeLocationsQueryVariables>({ query });
  if (!is(result.officeLocations)) {
    throw new Error(`Failed to find office locations`);
  }

  return result.officeLocations;
}
