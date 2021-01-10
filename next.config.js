const fs = require('fs');

if (process.env.FAVICONS === 'true') {
  const generateFavicons = require('./generateFavicons');
  generateFavicons();
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

function getVersion() {
  const packageRaw = fs.readFileSync('package.json');
  const package = JSON.parse(packageRaw);
  return package.version;
}

console.dir(process.env, { depth: null });

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: { autoPrerender: false },
  poweredByHeader: false,
  images: {
    domains: ['images.ctfassets.net'],
  },
  env: {
    SITE_VERSION: getVersion(),
    GITHUB_BRANCH: process.env.VERCEL_GITHUB_COMMIT_REF,
  },
});
