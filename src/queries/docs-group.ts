import { notNullUndefined } from "~/types";

import { queryFn } from "./base";
import query from "./docs-group.gql";

import type { DocsGroup } from "./docs-groups";
import type { DocsGroupQuery, DocsGroupQueryVariables } from "~/types/schema";

export default async function docsGroups(variables: DocsGroupQueryVariables): Promise<DocsGroup> {
  const result = await queryFn<DocsGroupQuery, DocsGroupQueryVariables>({ query, variables });
  if (!notNullUndefined(result.docsGroup)) {
    throw new Error(
      `Failed to find docs group with query variables '${JSON.stringify(variables)}'`,
    );
  }
  return result.docsGroup;
}
