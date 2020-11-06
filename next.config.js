if (process.env.FAVICONS === 'true') {
  const generateFavicons = require('./generateFavicons');
  generateFavicons();
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: { autoPrerender: false },
  poweredByHeader: false,
  images: {
    domains: ['images.ctfassets.net'],
  },
});
