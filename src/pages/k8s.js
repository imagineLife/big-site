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
          filter: { frontmatter: { slug: { regex: "/k8s/" }, parentDir: { regex: "/k8s$/" } } }
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
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>K8s</h1>
              <h2 title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!">An Introduction</h2>
              {pages.map(
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
