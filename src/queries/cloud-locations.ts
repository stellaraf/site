import query from "./cloud-locations.gql";
import { queryFn } from "./base";
import { notNullUndefined } from "~/types";

import type { CloudLocationsQuery } from "~/types/schema";

export type CloudLocations = CloudLocationsQuery["cloudLocations"];
export type CloudLocation = ArrayElement<CloudLocations>;

export default async function (): Promise<CloudLocations> {
  const result = await queryFn<CloudLocationsQuery, {}>({ query });
  if (!notNullUndefined(result.cloudLocations)) {
    throw new Error(`Failed to find cloud locations`);
  }
  return result.cloudLocations;
}
