import fs from "node:fs";
import path from "node:path";

import { is } from "~/lib";
import { directoryFiles, findProjectRoot } from "~/lib/server";

import { queryFn } from "../base";
import query from "../gql/docs-page-static-paths.gql";

import type { DocsPageStaticPathsQuery, DocsPageStaticPathsQueryVariables } from "~/types";

export default async function (variables: DocsPageStaticPathsQueryVariables): Promise<string[]> {
  const result = await queryFn<DocsPageStaticPathsQuery, DocsPageStaticPathsQueryVariables>({
    query,
    variables,
  });

  if (!is(result.docsPages)) {
    throw new Error(
      `Failed to find docs pages with query variables '${JSON.stringify(variables)}'`,
    );
  }

  const root = await findProjectRoot(__dirname);
  const pagesDir = (await fs.promises.readdir(root)).map(dir => path.resolve(root, dir));

  const pages = await pagesDir.reduce<Promise<string[]>>(async (finalPromise, child) => {
    let pagePaths: string[] = [];
    let final = await finalPromise;

    const stat = await fs.promises.stat(child);

    // If child is a directory, recursively check each file and subdirectory to find all file names.
    if (stat.isDirectory()) {
      const childFiles = await directoryFiles(child, { pattern: /^[a-zA-Z].+/gi });
      pagePaths = [...pagePaths, ...childFiles];
    }
    // Otherwise, add the file to the list.
    else {
      pagePaths = [...pagePaths, child];
    }
    // Get each file's base file name without the file extension. E.g. `/path/to/file.tsx` becomes `file`
    const resolvedPageNames = pagePaths.map(pagePath => path.parse(path.basename(pagePath)).name);

    final = [...final, ...resolvedPageNames];
    return final;
  }, Promise.resolve([]));

  const slugs = result.docsPages.map(d => d.slug);

  // Filter page names from CMS so that non-dynamic pages are excluded.
  const staticPaths = slugs.reduce<string[]>((final, slug) => {
    if (!pages.includes(slug)) {
      final = [...final, slug];
    }
    return final;
  }, []);

  return staticPaths;
}
