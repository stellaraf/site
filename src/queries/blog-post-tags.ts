import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/blog-post-tags.gql";

import type { BlogPostTagsQuery, BlogPostTagsQueryVariables } from "~/types";

export default async function (variables: BlogPostTagsQueryVariables): Promise<string[]> {
  const result = await queryFn<BlogPostTagsQuery, BlogPostTagsQueryVariables>({ query, variables });
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
