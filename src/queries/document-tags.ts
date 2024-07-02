import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/document-tags.gql";

import type { DocumentTagsQuery, DocumentTagsQueryVariables } from "~/types";

export default async function (variables: DocumentTagsQueryVariables): Promise<string[]> {
  const result = await queryFn<DocumentTagsQuery, DocumentTagsQueryVariables>({ query, variables });
  if (!is(result)) {
    throw new Error(`Failed to find document with query variables '${JSON.stringify(variables)}'`);
  }
  const tags = Array.from(
    new Set(result.documents.map(doc => doc.contentTags.map(tag => tag.tag.toLowerCase())).flat()),
  );
  return tags;
}
