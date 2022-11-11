import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/config.gql";

import type { ConfigQuery, ConfigQueryVariables } from "~/types";

export type Config = NonNullable<PropOf<ConfigQuery, "values">>;
export type Testimonial = ArrayElement<Config["testimonials"]>;

export default async function config(
  variables: ConfigQueryVariables = { title: "Stellar" },
): Promise<Config> {
  const result = await queryFn<ConfigQuery, ConfigQueryVariables>({ query, variables });
  if (!is(result.values)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }
  return result.values;
}
