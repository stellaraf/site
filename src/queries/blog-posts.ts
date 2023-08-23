import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/blog-posts.gql";

import type { BlogPostsQuery, BlogPostsQueryVariables } from "~/types";

export type BlogPosts = NonNullable<BlogPostsQuery>["blogPosts"];

export default async function (): Promise<BlogPosts> {
  const result = await queryFn<BlogPostsQuery, BlogPostsQueryVariables>({ query });
  if (!is(result.blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }
  return result.blogPosts;
}
