import React, { Fragment } from "react"
import { StaticQuery, graphql } from "gatsby"
import createLinksWithType from "./../../components/createLinksWithType"
import onlyByString from './../../components/onlyByString'
// Components
import Layout from "./../../components/layout"
import Hero from "./../../components/hero"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query SocialWorldTOC {
        thesepages: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/(strengths|social)/" } }
          }
        ) {
          pages: edges {
            page: node {
              overview: frontmatter {
                slug
                title
                excerpt
              }
            }
          }
        }
      }
    `}
    render={({
      thesepages: { pages },
    }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>You, Me, and the Social World</h1>
              {pages
                .filter(onlyByString("social"))
                .map(createLinksWithType({ thisType: "social" }))}

              <h2>On Natural Talents</h2>
              <p>
                We have skills and talents that seemingly are part of our
                identity. <br /> These can shape our experiences and our world
                for the better.
              </p>
              {pages
                .filter(onlyByString("strengths"))
                .map(createLinksWithType({ thisType: "talent" }))}
              <h2>On Conflict And Conflict Resolution</h2>
              <p>
                Conflict is inevitable. Much is written on conflict and
                resolution. <i>More to come here...</i>
              </p>
            </section>
          </Layout>
        </Fragment>
      )
    }}
  />
)

export default IndexPage
