import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./cloud-locations.gql";

import type { CloudLocationsQuery } from "~/types/schema";

export type CloudLocations = CloudLocationsQuery["cloudLocations"];
export type CloudLocation = ArrayElement<CloudLocations>;

export default async function (): Promise<CloudLocations> {
  const result = await queryFn<CloudLocationsQuery, unknown>({ query });
  if (!notNullUndefined(result.cloudLocations)) {
    throw new Error(`Failed to find cloud locations`);
  }
  return result.cloudLocations;
}
