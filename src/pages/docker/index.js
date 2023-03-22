import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from "./../../components/layout"
import Hero from './../../components/hero';
import PageHead from "./../../components/PageHead"
import createLinksWithType from './../../components/createLinksWithType';
// import './scrum.scss';

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
              parentDir: { regex: "/docker/" }
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
      const intro_max_index = 4
      const node_max_index = 9;
      const myPages = {
        intro: [],
        node: []
      }
      pages.forEach(p => { 
        if (p.page.overview.order <= intro_max_index) myPages.intro.push(p)
        else if (p.page.overview.order > intro_max_index && p.page.overview.order <= node_max_index) myPages.node.push(p)
        else { 
          // console.log("%c UnHandled Page", "background-color: red; color: black;")
          
          // console.log(p.page.overview.slug)
          // console.log(p.page.overview.order)
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
              {myPages.intro.map(createLinksWithType({ thisType: "docker-intro" }))}
              <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
               {myPages.node.map(createLinksWithType({ thisType: "docker-node" }))}
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
      title: "Docker Blog",
      excerpt: "A Blog on Learning Docker",
      slug: 'docker',
      tags: ["docker", "containers"]
    }} />
  );
}