import { is } from "~/lib";
import { Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/home-page.gql";

import type { HomePageQuery, HomePageQueryVariables } from "~/types";

export type HomePage = NonNullable<HomePageQuery["homePage"]>;
export type HomePageBlock = ArrayElement<HomePage["blocks"]>;

export default async function (variables: HomePageQueryVariables): Promise<HomePage> {
  const { name = "Main", stage = Stage.Published } = variables;
  let result = await queryFn<HomePageQuery, HomePageQueryVariables>({
    query,
    variables: { name, stage },
  });
  if (!is(result.homePage) && stage === Stage.Draft) {
    result = await queryFn<HomePageQuery, HomePageQueryVariables>({
      query,
      variables: { name, stage: Stage.Published },
    });
  }
  if (!is(result.homePage)) {
    throw new Error(
      `Failed to find configuration with query variables '${JSON.stringify({ name, stage })}'`,
    );
  }
  return result.homePage;
}
