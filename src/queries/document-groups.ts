import { is } from "~/lib";
import { type DocumentGroupsQuery, type DocumentGroupsQueryVariables, Stage } from "~/types";

import { queryFn } from "./base";
import query from "./gql/blog-posts.gql";

export type DocumentGroups = NonNullable<DocumentGroupsQuery>["documentGroups"];

export default async function (variables: DocumentGroupsQueryVariables): Promise<DocumentGroups> {
  const { stage = Stage.Published } = variables;
  let result = await queryFn<DocumentGroupsQuery, DocumentGroupsQueryVariables>({
    query,
    variables: { stage },
  });
  if (!is(result.documentGroups)) {
    result = await queryFn<DocumentGroupsQuery, DocumentGroupsQueryVariables>({
      query,
      variables: { stage: Stage.Published },
    });
  }
  if (!is(result.documentGroups)) {
    throw new Error(`Failed to find blog posts`);
  }
  return result.documentGroups;
}
