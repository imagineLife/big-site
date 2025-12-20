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
  output: 'export',
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
    unoptimized: true, // required for static export if you use next/image
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
