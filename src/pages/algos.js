import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import createLinksWithType from "./../components/createLinksWithType"
// import './scrum.scss';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query algosTOC {
        algos: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              parentDir: { regex: "/algos/" }
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
    render={({ algos: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Algorithms</h1>
              <h2 title="Thanks to ThePrimeagen for sparking some curiosity here!">
              </h2>
              {pages.map(createLinksWithType({ thisType: "algos" }))}
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
      <title>Algorithms Blog</title>
      <meta name="description" content="A Set Of Blog Posts Reviewing Algorithms" />
      <meta property="og:title" content="algos Blog" />
      <meta property="og:url" content="http://laursen.tech/algos" />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
    </Fragment>
  )
}