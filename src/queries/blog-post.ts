import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/blog-post.gql";

import type { BlogPostQuery, BlogPostQueryVariables } from "~/types";

export type BlogPost = NonNullable<BlogPostQuery["blogPost"]>;
export type BlogPostTags = BlogPost["blogPostTags"];

export default async function (variables: BlogPostQueryVariables): Promise<BlogPost> {
  const result = await queryFn<BlogPostQuery, BlogPostQueryVariables>({ query, variables });
  if (!is(result.blogPost)) {
    throw new Error(`Failed to find blog post with query variables '${JSON.stringify(variables)}'`);
  }
  return result.blogPost;
}
