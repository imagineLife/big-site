import React, { Fragment } from "react"
import { StaticQuery, graphql } from "gatsby"
import createLinksWithType from "./../../components/createLinksWithType"
import { onlyWithString } from './../../components/onlyByString' //onlyWithoutString
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
            frontmatter: { order: { gt: 0 }, slug: { regex: "/(strengths|^the-social)/" } }
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
              <h1 style={{marginBottom: '2rem'}}>You, Me, and the Social World</h1>
              <h3>On Decision Making</h3>
              {pages
                .filter(onlyWithString("decision"))
                .map(createLinksWithType({ thisType: "social" }))}

              <h3>On Natural Talents</h3>
              <p>
                We have skills and talents that seemingly are part of our
                identity. <br /> These can shape our experiences and our world
                for the better.
              </p>
              {pages
                .filter(onlyWithString("strengths"))
                .map(createLinksWithType({ thisType: "talent" }))}
              <h3>On Conflict And Conflict Resolution</h3>
              <p>
                Conflict is inevitable. Much is written on conflict and
                resolution. <i>More to come here...</i>
              </p>
              {pages
                .filter(onlyWithString("conflict"))
                .map(createLinksWithType({ thisType: "social" }))}
            </section>
          </Layout>
        </Fragment>
      )
    }}
  />
)

export default IndexPage
