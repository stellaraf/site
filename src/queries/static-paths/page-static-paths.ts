import { is } from "~/lib";

import { queryFn } from "../base";
import query from "../gql/page-static-paths.gql";

import type { StaticPathsQuery, StaticPathsQueryVariables } from "~/types";

export default async function (variables: StaticPathsQueryVariables): Promise<string[]> {
  const result = await queryFn<StaticPathsQuery, StaticPathsQueryVariables>({ query, variables });

  if (!is(result.pages)) {
    throw new Error(`Failed to find pages with query variables '${JSON.stringify(variables)}'`);
  }

  // Singular pages shouldn't have a subpath (e.g. `path/subpath`), so don't bother parsing.
  if (result.pages.length === 1) {
    return [result.pages[0].slug];
  }

  // We only want the subpath page name (e.g. for a page with slug `path/subpath`, we only want `subpath`).
  return result.pages.reduce<string[]>((paths, page) => {
    const parts = page.slug.split("/");
    // Don't include singular pages. For example, if the result is:
    // ["path", "path/subpath1", "path/subpath2"]
    // We want the result to be `["subpath1", "subpath2"]`
    if (parts.length > 1) {
      paths = [...paths, parts[parts.length - 1]];
    }
    return paths;
  }, []);
}
