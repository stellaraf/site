import fs from "node:fs";
import path from "node:path";

import { findUp } from "find-up";

import { is } from "~/lib";

import { queryFn } from "./base";
import query from "./gql/docs-page-static-paths.gql";

import type { DocsPageStaticPathsQuery, DocsPageStaticPathsQueryVariables } from "~/types";

function dirBaseNames(dir: string): string[] {
  let final: string[] = [];
  let result: string[] = [];
  for (const child of fs.readdirSync(dir)) {
    const childPath = path.resolve(dir, child);
    const pageName = path.parse(path.basename(childPath)).name;
    if (pageName.match(/^[a-zA-Z].+/gi)) {
      result = [...result, childPath];
    }
  }
  for (const child of result) {
    const stat = fs.statSync(child);
    if (stat.isDirectory()) {
      final = [...final, ...dirBaseNames(child)];
    } else {
      final = [...final, child];
    }
  }
  return final;
}

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

  const slugs = result.docsPages.map(d => d.slug);

  const pkg = await findUp("package.json");
  if (typeof pkg === "undefined") {
    throw new Error("unable to find package.json in project");
  }
  const baseDir = path.resolve(path.dirname(pkg));

  const pagesDir = (await fs.promises.readdir(baseDir)).map(dir => path.resolve(baseDir, dir));

  const pages = pagesDir.reduce<string[]>((final, child) => {
    const stat = fs.statSync(child);
    let pagePaths: string[] = [];
    if (stat.isDirectory()) {
      pagePaths = [...pagePaths, ...dirBaseNames(child)];
    } else {
      pagePaths = [...pagePaths, child];
    }
    final = [...final, ...pagePaths.map(pagePath => path.parse(path.basename(pagePath)).name)];
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
