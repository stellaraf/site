import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./docs-page.gql";

import type { DocsPageQuery, DocsPageQueryVariables, Admonition } from "~/types";

export type DocsPage = NonNullable<DocsPageQuery["docsPage"]>;
export type AdmonitionModel = Pick<Admonition, "__typename" | "body" | "id" | "title" | "type">;

export default async function (variables: DocsPageQueryVariables): Promise<DocsPage> {
  const result = await queryFn<DocsPageQuery, DocsPageQueryVariables>({ query, variables });
  if (!is(result.docsPage)) {
    throw new Error(`Failed to find docs page with query variables '${JSON.stringify(variables)}'`);
  }
  return result.docsPage;
}
