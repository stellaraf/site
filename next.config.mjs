import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

function getVersion() {
  const packageRaw = fs.readFileSync("package.json");
  const { version } = JSON.parse(packageRaw);
  return version;
}

console.dir(process.env, { depth: null });

function copyPDFWorker() {
  const cwd = dirname(fileURLToPath(import.meta.url));
  const src = path.join(cwd, "node_modules", "pdfjs-dist", "build", "pdf.worker.js");
  const dst = path.join(cwd, "public", "assets", "pdf.worker.js");
  fs.copyFileSync(src, dst);
}

copyPDFWorker();

/** @type {import("next").NextConfig} */
const config = {
  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "raw-loader",
    });
    config.externals.push("find-up", "'node:path'", { "node:path": "commonjs path" }, "'node:fs'", {
      "node:fs": "commonjs fs",
    });
    return config;
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["media.graphassets.com"],
  },
  env: {
    SITE_VERSION: getVersion(),
    GIT_BRANCH: process.env.VERCEL_GIT_COMMIT_REF,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
};

export default withBundleAnalyzer(config);
