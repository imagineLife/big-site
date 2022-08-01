import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import { Helmet } from 'react-helmet';
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
          filter: { frontmatter: { slug: { regex: "/k8s/" }, parentDir: { regex: "/k8s/" } } }
          sort: { fields: frontmatter___order }
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
    render={({ k8s: { pages } }) => {
      let rootPages = []
      let inDepthPages = []
      // categorize into "Getting Started" and "In-Depth"
      pages.forEach((p,pidx) => { 
        if (!p.page.overview.slug.includes('in-depth')) {
          rootPages.push(p);
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
              {rootPages.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx,
                ) => {
                  return (
                    <div className="toc-card" key={`k8s-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  );
                },
              )}
              <br />
              <br />
              <br />
              <h2>More In-Depth</h2>
              {inDepthPages.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx,
                ) => {
                  return (
                    <div className="toc-card" key={`k8s-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  );
                },
              )}
            </section>
          </Layout>
        </Fragment>
      );
    }}
  />
);

export default IndexPage;
