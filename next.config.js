// DOCS
// https://nextjs.org/docs/pages/api-reference/next-config-js/webpack

// txt file
const textLoader = {
  test: /\.txt/,
  type: 'asset/source',
};

const svgLoader = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push(textLoader);
    config.module.rules.push(svgLoader);

    // Important: return the modified config
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/show/**',
      },
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
  staticPageGenerationTimeout: 170,
};

module.exports = nextConfig;
