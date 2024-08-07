import { is } from "~/lib";
import {
  type BlogPostsByTagsQuery,
  type BlogPostsByTagsQueryVariables,
  type BlogPostsQuery,
  type BlogPostsQueryVariables,
  Stage,
} from "~/types";

import { queryFn } from "./base";
import query from "./gql/blog-posts.gql";

export type BlogPosts = NonNullable<BlogPostsQuery>["blogPosts"];

export interface BlogPostsByTag {
  blogPosts: BlogPosts;
  tag: string;
}

export default async function (variables: BlogPostsQueryVariables): Promise<BlogPosts> {
  const { stage = Stage.Published } = variables;
  let result = await queryFn<BlogPostsQuery, BlogPostsQueryVariables>({
    query,
    variables: { stage },
  });
  if (!is(result.blogPosts)) {
    result = await queryFn<BlogPostsQuery, BlogPostsQueryVariables>({
      query,
      variables: { stage: Stage.Published },
    });
  }
  if (!is(result.blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }
  return result.blogPosts;
}

export async function blogPostsByTagsQuery(
  variables: BlogPostsByTagsQueryVariables,
): Promise<BlogPostsByTag> {
  const { tag, stage } = variables;
  let result = await queryFn<BlogPostsByTagsQuery, BlogPostsByTagsQueryVariables>({
    query,
    variables: { tag, stage },
  });
  if (!is(result.blogPosts)) {
    result = await queryFn<BlogPostsByTagsQuery, BlogPostsByTagsQueryVariables>({
      query,
      variables: { tag, stage: Stage.Published },
    });
  }
  if (!is(result.blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }
  let match = variables.tag;
  for (const post of result.blogPosts) {
    for (const tag of post.contentTags) {
      if (tag.tag.toLowerCase() == variables.tag.toLowerCase()) {
        match = tag.tag;
      }
    }
  }
  return { blogPosts: result.blogPosts, tag: match };
}
