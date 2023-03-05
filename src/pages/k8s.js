import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import createLinksWithType from "./../components/createLinksWithType"
import PageHead from "./../components/PageHead"
import './scrum.scss';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query k8sTOC {
        k8s: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: {
              order: { gt: 0 }
              slug: { regex: "/^k8s(?!.*(docker|examples)).*/" }
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
    render={({ k8s: { pages } }) => {
      let rootPages = []
      let inDepthPages = []
      // categorize into "Getting Started" and "In-Depth"
      pages.forEach((p, pidx) => {
        if (!p.page.overview.slug.includes("in-depth")) {
          rootPages.push(p)
        } else {
          inDepthPages.push(p)
        }
      })
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>K8s</h1>
              <h2 title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!">
                Getting Started
              </h2>
              {rootPages.map(createLinksWithType({ thisType: "k8s" }))}
              <br />
              <br />
              <br />
              <h2>More In-Depth</h2>
              {inDepthPages.map(
                createLinksWithType({ thisType: "k8s-in-depth" })
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
    <PageHead {...{
      title: "Kubernetes Blog",
      excerpt: "A Blog on Learning Kubernetes",
      slug: 'k8s',
      tags: ["k8s","orchestration", "deployments", "pods", "replicaSets", "yaml", "containers"]
    }} />
  );
}