import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import PageHead from "./../components/PageHead"
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
    <PageHead {...{
      title: "Javascript Blog",
      excerpt: "A Blog on Learning JavaScript",
      slug: 'javascropt',
      tags: ["javascript"]
    }} />
  )
}
