module.exports = {
  siteMetadata: {
    title: 'imagineLife',
    description: 'A Place for some content',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-WZNFNRGGSR', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Defaults to https://www.googletagmanager.com
          // origin: 'YOUR_SELF_HOSTED_ORIGIN',
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          'gatsby-remark-mermaid',
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 400,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-mermaid',
          },
        ],
        plugins: ['gatsby-remark-images'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `recipes`,
        path: `content/recipes`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `strengths`,
        path: `content/strengths`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `scrum`,
        path: `content/scrum`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `febs`,
        path: `content/febs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `node`,
        path: `content/node`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `json-data`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `http-server`,
        path: `${__dirname}/content/http-server`,
      },
    },
  ],
};
