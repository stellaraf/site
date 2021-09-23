const fs = require('fs');

if (process.env.FAVICONS === 'true') {
  const generateFavicons = require('./generateFavicons');
  generateFavicons();
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

function getVersion() {
  console.log('VERCEL_URL:', process.env.VERCEL_URL);
  const packageRaw = fs.readFileSync('package.json');
  const package = JSON.parse(packageRaw);
  return package.version;
}

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: { autoPrerender: false },
  poweredByHeader: false,
  images: {
    domains: ['images.ctfassets.net'],
  },
  env: {
    SITE_VERSION: getVersion(),
    GIT_BRANCH: process.env.VERCEL_GIT_COMMIT_REF,
  },
});
