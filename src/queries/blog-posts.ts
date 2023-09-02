import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/blog-posts.gql";

import type {
  BlogPostsQuery,
  BlogPostsByTagsQuery,
  BlogPostsQueryVariables,
  BlogPostsByTagsQueryVariables,
} from "~/types";

export type BlogPosts = NonNullable<BlogPostsQuery>["blogPosts"];

export interface BlogPostsByTag {
  blogPosts: BlogPosts;
  tag: string;
}

export default async function (variables: BlogPostsQueryVariables): Promise<BlogPosts> {
  const result = await queryFn<BlogPostsQuery, BlogPostsQueryVariables>({ query, variables });
  if (!is(result.blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }
  return result.blogPosts;
}

export async function blogPostsByTagsQuery(
  variables: BlogPostsByTagsQueryVariables,
): Promise<BlogPostsByTag> {
  const { blogPosts } = await queryFn<BlogPostsByTagsQuery, BlogPostsByTagsQueryVariables>({
    query,
    variables,
  });
  if (!is(blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }
  let match = variables.tag;
  for (const post of blogPosts) {
    for (const tag of post.blogPostTags) {
      if (tag.tag.toLowerCase() == variables.tag.toLowerCase()) {
        match = tag.tag;
      }
    }
  }
  return { blogPosts, tag: match };
}
