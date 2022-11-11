import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/docs-group.gql";

import type { DocsGroup } from "./docs-groups";
import type { DocsGroupQuery, DocsGroupQueryVariables } from "~/types";

export default async function docsGroups(variables: DocsGroupQueryVariables): Promise<DocsGroup> {
  const result = await queryFn<DocsGroupQuery, DocsGroupQueryVariables>({ query, variables });
  if (!is(result.docsGroup)) {
    throw new Error(
      `Failed to find docs group with query variables '${JSON.stringify(variables)}'`,
    );
  }
  return result.docsGroup;
}
