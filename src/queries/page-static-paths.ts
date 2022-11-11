import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/page-static-paths.gql";

import type { StaticPathsQuery, StaticPathsQueryVariables } from "~/types";

export default async function (variables: StaticPathsQueryVariables): Promise<string[]> {
  const result = await queryFn<StaticPathsQuery, StaticPathsQueryVariables>({ query, variables });

  if (!is(result.pages)) {
    throw new Error(`Failed to find pages with query variables '${JSON.stringify(variables)}'`);
  }

  if (result.pages.length === 1) {
    return [result.pages[0].slug];
  }

  return result.pages.reduce<string[]>((paths, page) => {
    const parts = page.slug.split("/");
    if (parts.length > 1) {
      paths = [...paths, parts[parts.length - 1]];
    }
    return paths;
  }, []);
}
