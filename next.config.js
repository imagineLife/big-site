// next.config.js

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      '*.txt': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.svgrepo.com', pathname: '/show/**' },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
        pathname: '/grainnet-com/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
