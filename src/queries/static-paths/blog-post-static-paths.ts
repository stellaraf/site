import fs from "node:fs";
import path from "node:path";

import { is } from "~/lib";
import { findProjectRoot } from "~/lib/server";

import { queryFn } from "../base";
import query from "../gql/blog-post-static-paths.gql";

import type { BlogPostStaticPathsQuery, BlogPostStaticPathsQueryVariables } from "~/types";

export default async function (): Promise<string[]> {
  const result = await queryFn<BlogPostStaticPathsQuery, BlogPostStaticPathsQueryVariables>({
    query,
  });

  if (!is(result.blogPosts)) {
    throw new Error(`Failed to find blog posts`);
  }

  const root = await findProjectRoot(__dirname, { exclude: [/.*\.next.*/gi] });
  const dirName = path.resolve(root, "pages", "blog");
  const dir = (await fs.promises.readdir(dirName)).map(page => path.resolve(root, page));

  // Find all page files (excluding Next.js pages like _app or _document).
  const pages = dir.reduce<string[]>((final, child) => {
    const pageName = path.parse(path.basename(child)).name;
    // Don't include the file extension.
    if (pageName.match(/^[a-zA-Z].+/gi)) {
      final = [...final, pageName];
    }
    return final;
  }, []);

  const slugs = result.blogPosts.map(p => p.slug);

  // Filter page names from CMS so that non-dynamic pages are excluded.
  const staticPaths = slugs.reduce<string[]>((final, slug) => {
    if (!pages.includes(slug)) {
      final = [...final, slug];
    }
    return final;
  }, []);

  return staticPaths;
}
