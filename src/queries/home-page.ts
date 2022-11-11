import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/home-page.gql";

import type { HomePageQuery, HomePageQueryVariables } from "~/types";

export type HomePage = NonNullable<HomePageQuery["homePage"]>;
export type HomePageBlock = ArrayElement<HomePage["blocks"]>;

export default async function (
  variables: HomePageQueryVariables = { name: "Main" },
): Promise<HomePage> {
  const result = await queryFn<HomePageQuery, HomePageQueryVariables>({ query, variables });
  if (!is(result.homePage)) {
    throw new Error(`Failed to find configuration with query variables '${variables}'`);
  }

  return result.homePage;
}
