import query from "./home-page.gql";
import { queryFn } from "./base";
import { notNullUndefined } from "~/types";

import type { HomePageQuery, HomePageQueryVariables } from "~/types/schema";

export type HomePage = NonNullable<HomePageQuery["homePage"]>;
export type HomePageBlock = ArrayElement<HomePage["blocks"]>;

export default async function (
  variables: HomePageQueryVariables = { name: "Main" },
): Promise<HomePage> {
  const result = await queryFn<HomePageQuery, HomePageQueryVariables>({ query, variables });
  if (!notNullUndefined(result.homePage)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }

  return result.homePage;
}
