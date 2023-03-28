import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from "./../../components/layout"
import Hero from "./../../components/hero"
import createLinksWithType from "./../../components/createLinksWithType"
import PageHead from "./../../components/PageHead"

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query LinuxTOC {
        linux: allMarkdownRemark(
          filter: { frontmatter: { slug: { regex: "/linux/" } } }
          sort: { frontmatter: { order: ASC } }
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
    render={({ linux: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Linux</h1>
              {pages.map(createLinksWithType({thisType: 'linux'}))}
              <sub>
                Thanks to{" "}
                <Link to={"https://github.com/btholt"}>Brian Holt</Link> and{" "}
                <Link to={"https://frontendmasters.com"}>FrontendMasters</Link>{" "}
                for sparking some curiosity here!
              </sub>
              <br />
              <sub>
                Also, check out{" "}
                <Link to="https://tldp.org/LDP/abs/html/">
                  this in-depth set of write-ups
                </Link>{" "}
                for another look into bash, including lots more details and
                nuiance.
              </sub>
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
     <PageHead {...{
      title: "Linux & Bash Blog",
      excerpt: "A Blog on Learning A Bit of Linux and Bash",
      slug: 'linux',
      tags: ["bash","cli","linux","os","scripting"]
    }} />
  );
}