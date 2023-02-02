import fs from "node:fs";
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
    domains: ["images.ctfassets.net", "media.graphassets.com"],
  },
  env: {
    SITE_VERSION: getVersion(),
    GIT_BRANCH: process.env.VERCEL_GIT_COMMIT_REF,
  },
};

export default withBundleAnalyzer(config);
