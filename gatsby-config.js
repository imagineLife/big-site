/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const robots = require("./robots-txt")

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `Laursen.Tech: A Blog And Portfolio`,
    author: {
      name: `Eric (Jake) Laursen`,
      summary: `Learner, Do-er, Software Developer`,
    },
    description: `Notes and Thoughts on SaaS Tech & People-Oriented SaaS Work`,
    siteUrl: `https://laursen.tech/`,
  },
  plugins: [
    `gatsby-read-time-estimate`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-remark-embed-video",
      options: {
        width: 800,
        ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
        height: 400, // Optional: Overrides optional.ratio
        related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
        noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
        loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
        urlOverrides: [
          {
            id: "youtube",
            embedURL: videoId =>
              `https://www.youtube-nocookie.com/embed/${videoId}`,
          },
        ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
        containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
        iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
      },
    },
    `gatsby-plugin-image`,
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
        name: `k8s`,
        path: `content/k8s`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              launchOptions: {
                executablePath: "",
                // executablePath: "path/to/chrome/executable",
              },
              svgo: {
                plugins: [{ name: "removeTitle", active: false }],
              },
              mermaidOptions: {
                theme: "dark",
                // themeCSS: ".node rect { fill: #fff; }",
              },
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node?.frontmatter?.date || new Date(),
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {
                  frontmatter: {
                    order: DESC
                  }
                }
                filter: {
                  frontmatter: {
                    title: {ne: ""}
                  }
                }) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Eric (Jake) Laursen Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `laursen.tech`,
        short_name: `laursen.ltech`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allMarkdownRemark(filter: { 
              frontmatter: { 
                order: { gt: 0 } 
                slug: { regex: "/^(?!k8s/examples|fwebs|backend|py)/" }
              } }){
              pages: edges {
                page: node {
                  fields{
                    gitAuthorTime
                  }
                  overview: frontmatter {
                    slug
                  }
                }
                
              }
            }
          }
        `,
        resolveSiteUrl: () => `https://laursen.tech/`,
        resolvePages: ({ allMarkdownRemark }) => {
          return allMarkdownRemark.pages.map(sitePage => {
            return {
              modifiedTime: sitePage.page.fields.gitAuthorTime,
              path: sitePage.page.overview.slug,
            }
          })
        },
        serialize: ({ path, modifiedTime }) => {
          return {
            url: path,
            lastmod: modifiedTime,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://laursen.tech",
        sitemap: "https://laursen.tech/sitemap-index.xml",
        // { userAgent: "*", allow: "/" }
        policy: [
          ...robots.allow.map(d => ({
            userAgent: d,
            disallow: ["/tags/", "/tags/*"],
          })),
        ],
      },
    },
  ],
}

// "gatsby-plugin-offline",
