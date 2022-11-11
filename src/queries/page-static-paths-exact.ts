import fs from "node:fs";
import path from "node:path";

import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/page-static-paths-exact.gql";

import type { StaticPathsExactQuery, StaticPathsExactQueryVariables } from "~/types";

export default async function (): Promise<string[]> {
  const result = await queryFn<StaticPathsExactQuery, StaticPathsExactQueryVariables>({ query });

  if (!is(result.pages)) {
    throw new Error("Failed to find pages");
  }

  const slugs = result.pages.map(p => p.slug);

  const pagesDirName = path.resolve(__dirname, "..", "..", "..", "pages");
  const pagesDir = await fs.promises.readdir(pagesDirName);

  const pages = pagesDir.reduce<string[]>((final, child) => {
    if (child.match(/^[a-zA-Z].+/gi)) {
      const pageName = path.parse(path.basename(child)).name;
      final = [...final, pageName];
    }
    return final;
  }, []);

  const staticPaths = slugs.reduce<string[]>((final, slug) => {
    if (!pages.includes(slug)) {
      final = [...final, slug];
    }
    return final;
  }, []);

  return staticPaths;
}
