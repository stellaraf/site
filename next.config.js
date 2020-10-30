const generateFavicons = require('./generateFavicons');

if (process.env.FAVICONS === 'true') {
  generateFavicons();
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: { autoPrerender: false },
  poweredByHeader: false,
});
