import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/cloud-locations.gql";

import type { CloudLocationsQuery } from "~/types";

export type CloudLocations = CloudLocationsQuery["cloudLocations"];
export type CloudLocation = ArrayElement<CloudLocations>;

export default async function (): Promise<CloudLocations> {
  const result = await queryFn<CloudLocationsQuery, unknown>({ query });
  if (!is(result.cloudLocations)) {
    throw new Error(`Failed to find cloud locations`);
  }
  return result.cloudLocations;
}
