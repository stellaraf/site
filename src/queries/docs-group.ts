import { is } from "~/lib";
import { type DocsGroupQuery, type DocsGroupQueryVariables, Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/docs-group.gql";

import type { DocsGroup } from "./docs-groups";

export default async function docsGroups(variables: DocsGroupQueryVariables): Promise<DocsGroup> {
  let result = await queryFn<DocsGroupQuery, DocsGroupQueryVariables>({ query, variables });
  if (!is(result.docsGroup)) {
    result = await queryFn<DocsGroupQuery, DocsGroupQueryVariables>({
      query,
      variables: { stage: Stage.Published },
    });
  }
  if (!is(result.docsGroup)) {
    throw new Error(
      `Failed to find docs group with query variables '${JSON.stringify(variables)}'`,
    );
  }
  return result.docsGroup;
}
