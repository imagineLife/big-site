import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import './scrum.scss';

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
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Docker</h1>
              <h2 title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!">
                Getting Started
              </h2>
              {pages.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx
                ) => {
                  return (
                    <div className="toc-card" key={`docker-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
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