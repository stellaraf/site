import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/blog-tags.gql";

import type { ContentTagsQuery, ContentTagsQueryVariables } from "~/types";

export default async function (variables: ContentTagsQueryVariables): Promise<string[]> {
  const result = await queryFn<ContentTagsQuery, ContentTagsQueryVariables>({ query, variables });
  if (!is(result)) {
    throw new Error(`Failed to find blog post with query variables '${JSON.stringify(variables)}'`);
  }
  const tags = Array.from(
    new Set(
      result.blogPosts.map(post => post.contentTags.map(tag => tag.tag.toLowerCase())).flat(),
    ),
  );
  return tags;
}
