import { is } from "~/lib";
import { type DocsGroupsQuery, type DocsGroupsQueryVariables, Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/docs-groups.gql";

export type DocsGroups = NonNullable<PropOf<DocsGroupsQuery, "docsGroups">>;
export type DocsGroup = ArrayElement<DocsGroups>;

export default async function docsGroups(variables: DocsGroupsQueryVariables): Promise<DocsGroups> {
  let result = await queryFn<DocsGroupsQuery, DocsGroupsQueryVariables>({ query, variables });
  if (!is(result.docsGroups)) {
    result = await queryFn<DocsGroupsQuery, DocsGroupsQueryVariables>({
      query,
      variables: { stage: Stage.Published },
    });
  }
  if (!is(result.docsGroups)) {
    throw new Error(
      `Failed to find docsGroups with query variables '${JSON.stringify(variables)}'`,
    );
  }
  return result.docsGroups;
}
