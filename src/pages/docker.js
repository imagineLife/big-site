import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import './scrum.scss';

function DockerPageLink({slug, title, excerpt }) {
  return (
    <div className="toc-card">
      <Link to={`/${slug}`} className="title">
        {title}
      </Link>
      <p className="content">{excerpt}</p>
    </div>
  )
}
/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query dockerTOC {
        docker: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              slug: { regex: "/docker/" }
              title: { ne: null }
            }
          }
        ) {
          pages: edges {
            page: node {
              overview: frontmatter {
                slug
                title
                excerpt
                parentDir
                order
              }
            }
          }
        }
      }
    `}
    render={({ docker: { pages } }) => {
      const myPages = {
        intro: [],
        node: []
      }
      pages.forEach(p => { 
        if (p.page.overview.order <= 3) myPages.intro.push(p)
        else if (p.page.overview.order > 3 && p.page.overview.order <= 9) myPages.node.push(p)
        else { 
          console.log("UnHandled Page")
          console.log(p.page.overview.slug)
          console.log(p.page.overview.order)
        } 
      })
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Docker</h1>
              <a href="/docker#getting-started">Getting Started</a>
              <br />
              <a href="/docker#docker-node-intro">Docker With Node: An Intro</a>
              <h2
                id="getting-started"
                title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!"
              >
                Getting Started
              </h2>
              {myPages.intro.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx
                ) => {
                  return (
                    <DockerPageLink
                      key={`docker-toc-${pageIdx}`}
                      slug={slug}
                      title={title}
                      excerpt={excerpt}
                    />
                  )
                }
              )}
              <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
              {myPages.node.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx
                ) => {
                  return (
                    <DockerPageLink
                      key={`docker-toc-${pageIdx}`}
                      slug={slug}
                      title={title}
                      excerpt={excerpt}
                    />
                  )
                }
              )}
            </section>
          </Layout>
        </Fragment>
      )
    }}
  />
)

export default IndexPage;
export function Head() {
  return (
    <Fragment>
      <title>Docker Blog</title>
      <meta name="description" content="A Blog on Learning Docker" />
      <meta property="og:title" content="Docker Blog" />
      <meta property="og:url" content="http://laursen.tech/docker" />
    </Fragment>
  );
}