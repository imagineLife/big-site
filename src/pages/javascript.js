import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import createLinksWithType from "../components/createLinksWithType"
import "./scrum.scss"

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query jsTOC {
        js: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              slug: { regex: "/js/" }
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
    render={({ js: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>JavaScript</h1>
              <sub><i>more on this soon...</i></sub>
            </section>
          </Layout>
        </Fragment>
      )
    }}
  />
)

export default IndexPage
export function Head() {
  return (
    <Fragment>
      <title>JavaScript Blog</title>
      <meta name="description" content="A Blog on JavaScript" />
      <meta property="og:title" content="JavaScript Blog" />
      <meta property="og:url" content="http://laursen.tech/javascript" />
    </Fragment>
  )
}
