import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/docs-groups.gql";

import type { DocsGroupsQuery, DocsGroupsQueryVariables } from "~/types";

export type DocsGroups = NonNullable<PropOf<DocsGroupsQuery, "docsGroups">>;
export type DocsGroup = ArrayElement<DocsGroups>;

export default async function docsGroups(variables: DocsGroupsQueryVariables): Promise<DocsGroups> {
  const result = await queryFn<DocsGroupsQuery, DocsGroupsQueryVariables>({ query, variables });
  if (!is(result.docsGroups)) {
    throw new Error(
      `Failed to find docsGroups with query variables '${JSON.stringify(variables)}'`,
    );
  }
  return result.docsGroups;
}
