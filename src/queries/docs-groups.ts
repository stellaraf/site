import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./docs-groups.gql";

import type { DocsGroupsQuery, DocsGroupsQueryVariables } from "~/types/schema";

export type DocsGroups = NonNullable<PropOf<DocsGroupsQuery, "docsGroups">>;
export type DocsGroup = ArrayElement<DocsGroups>;

export default async function docsGroups(
  variables: DocsGroupsQueryVariables = {},
): Promise<DocsGroups> {
  const result = await queryFn<DocsGroupsQuery, DocsGroupsQueryVariables>({ query, variables });
  if (!notNullUndefined(result.docsGroups)) {
    throw new Error(`Failed to find docsGroups with query variables '${variables}'`);
  }
  return result.docsGroups;
}
