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
      query nginxTOC {
        nginx: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              parentDir: { regex: "/nginx/" }
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
    render={({ nginx: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>nginx</h1>
              <h2 title="Thanks to Hussein Nasser for sparking some curiosity here!">
                Getting Started
              </h2>
              {pages.map(createLinksWithType({ thisType: "nginx" }))}
              <p>More to come here...</p>
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
      <title>Nginx Blog</title>
      <meta name="description" content="A Set Of Blog Posts Reviewing Nginx" />
      <meta property="og:title" content="Nginx Blog" />
      <meta property="og:url" content="http://laursen.tech/nginx" />
      <meta http-equiv="cache-control" content="no-cache" />
      <meta http-equiv="expires" content="0" />
      <meta http-equiv="pragma" content="no-cache" />
    </Fragment>
  )
}