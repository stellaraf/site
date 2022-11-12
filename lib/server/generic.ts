import fs from "node:fs";
import path from "node:path";

import { findUp, pathExists, type Options } from "find-up";

interface DirectoryFilesOptions {
  /** @default RegExp(".*") */
  pattern?: string | RegExp;
}

interface FindProjectRootOptions extends Options {
  exclude?: Array<string | RegExp>;
}

/**
 * Find a project root from a starting file or directory. Finds the first `package.json` file and
 * returns the fully resolved parent directory path.
 *
 * @param start Starting file or directory
 * @param options Options
 * @returns Resolved path of project root.
 */
export async function findProjectRoot(
  start: string,
  options: FindProjectRootOptions = {},
): Promise<string> {
  const { exclude = [], ...mergedOptions }: FindProjectRootOptions = { cwd: start, ...options };
  const pkgJson = await findUp(async directory => {
    const resolved = path.resolve(path.join(directory, "package.json"));

    for (const pattern of exclude) {
      if (resolved.match(new RegExp(pattern))) {
        return undefined;
      }
    }

    const parent = path.resolve(path.basename(resolved));
    const exists = await pathExists(parent);
    if (exists) {
      return parent;
    }
    return undefined;
  }, mergedOptions);
  // const pkgJson = await findUp("package.json", mergedOptions);
  if (typeof pkgJson === "undefined") {
    throw new Error(`Failed to find project root, starting from '${start}'`);
  }
  const projectRoot = path.resolve(path.dirname(pkgJson));
  return projectRoot;
}

/**
 * Walk a starting directory for all files contained within the starting directory or child
 * directories.
 *
 * @param directory Starting directory
 * @param options Options
 * @returns Array of resolved child files.
 */
export async function directoryFiles(
  directory: string,
  options: DirectoryFilesOptions = {},
): Promise<string[]> {
  const { pattern }: DirectoryFilesOptions = { pattern: /.*/gi, ...options };

  const directoryChildren = await fs.promises.readdir(directory);

  // Array of all fully resolved directory children matching pattern from options.
  const children = await directoryChildren.reduce<Promise<string[]>>(
    async (finalPromise, fileOrDirectory) => {
      let final = await finalPromise;
      const resolved = path.resolve(directory, fileOrDirectory);
      const baseName = path.basename(resolved);
      if (baseName.match(pattern)) {
        final = [...final, resolved];
      }
      return final;
    },
    Promise.resolve([]),
  );

  // Array of all files (not directories) from starting `directory` and all child directories.
  const allFiles = await children.reduce<Promise<string[]>>(async (finalPromise, file) => {
    let final = await finalPromise;
    const stat = await fs.promises.stat(file);
    if (stat.isDirectory()) {
      const childFiles = await directoryFiles(file);
      final = [...final, ...childFiles];
    } else {
      final = [...final, file];
    }
    return final;
  }, Promise.resolve([]));

  return allFiles;
}
