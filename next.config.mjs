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
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  env: {
    SITE_VERSION: getVersion(),
    GIT_BRANCH: process.env.VERCEL_GIT_COMMIT_REF,
  },
};

export default withBundleAnalyzer(config);
