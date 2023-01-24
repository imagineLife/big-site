import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"

// Components
import Layout from "./../../components/layout"
import Hero from "./../../components/hero"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query StrengthsTOC {
        strengths: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/strengths/" } }
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
        socials: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              slug: { regex: "/the-social-world/" }
            }
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
      strengths: { pages: talents },
      socials: { pages: socialPages },
    }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>You, Me, and the Social World</h1>
              {socialPages.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx
                ) => {
                  return (
                    <div className="toc-card" key={`socialPage-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  )
                }
              )}
              <h2>On Natural Talents</h2>
              <p>
                We have skills and talents that seemingly are part of our
                identity. <br /> These can shape our experiences and our world
                for the better.
              </p>
              {talents.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx
                ) => {
                  return (
                    <div className="toc-card" key={`strengths-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  )
                }
              )}
              <h2>On Conflict And Conflict Resolution</h2>
              <p>Conflict is inevitable. Much is written on these topics.</p>
              <sub>
                <i>More to come here</i>
              </sub>
            </section>
          </Layout>
        </Fragment>
      )
    }}
  />
)

export default IndexPage
