import fs from "node:fs";
import path from "node:path";

import { is } from "~/lib";
import { findProjectRoot } from "~/lib/server";

import { queryFn } from "../base";
import query from "../gql/page-static-paths-exact.gql";

import type { StaticPathsExactQuery, StaticPathsExactQueryVariables } from "~/types";

export default async function (): Promise<string[]> {
  const result = await queryFn<StaticPathsExactQuery, StaticPathsExactQueryVariables>({ query });

  if (!is(result.pages)) {
    throw new Error("Failed to find pages");
  }

  const root = await findProjectRoot(__dirname, { exclude: [/.*\.next.*/gi] });
  const pagesDirName = path.resolve(root, "pages");
  const pagesDir = (await fs.promises.readdir(pagesDirName)).map(page => path.resolve(root, page));

  // Find all page files (excluding Next.js pages like _app or _document).
  const pages = pagesDir.reduce<string[]>((final, child) => {
    const pageName = path.parse(path.basename(child)).name;
    // Don't include the file extension.
    if (pageName.match(/^[a-zA-Z].+/gi)) {
      final = [...final, pageName];
    }
    return final;
  }, []);

  const slugs = result.pages.map(p => p.slug);

  // Filter page names from CMS so that non-dynamic pages are excluded.
  const staticPaths = slugs.reduce<string[]>((final, slug) => {
    if (!pages.includes(slug)) {
      final = [...final, slug];
    }
    return final;
  }, []);

  return staticPaths;
}
