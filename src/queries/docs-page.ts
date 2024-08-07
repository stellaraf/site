import { is } from "~/lib";
import { type Admonition, type DocsPageQuery, type DocsPageQueryVariables, Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/docs-page.gql";

export type DocsPage = NonNullable<DocsPageQuery["docsPage"]>;
export type AdmonitionModel = Pick<Admonition, "__typename" | "body" | "id" | "title" | "type">;

export default async function (variables: DocsPageQueryVariables): Promise<DocsPage> {
  const { slug, stage } = variables;
  let result = await queryFn<DocsPageQuery, DocsPageQueryVariables>({
    query,
    variables: { slug, stage },
  });
  if (!is(result.docsPage)) {
    result = await queryFn<DocsPageQuery, DocsPageQueryVariables>({
      query,
      variables: { slug, stage: Stage.Published },
    });
  }
  if (!is(result.docsPage)) {
    throw new Error(`Failed to find docs page with query variables '${JSON.stringify(variables)}'`);
  }
  return result.docsPage;
}
