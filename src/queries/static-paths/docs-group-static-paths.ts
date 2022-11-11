import { is } from "~/lib";

import { queryFn } from "../base";
import query from "./gql/docs-group-static-paths.gql";

import type { DocsGroupStaticPathsQuery, DocsGroupStaticPathsQueryVariables } from "~/types";

export default async function (): Promise<string[]> {
  const result = await queryFn<DocsGroupStaticPathsQuery, DocsGroupStaticPathsQueryVariables>({
    query,
  });

  if (!is(result.docsGroups)) {
    throw new Error(`Failed to find docs groups`);
  }

  return result.docsGroups.map(d => d.slug);
}
