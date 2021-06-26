import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import PostPreview from './../components/PostPreview';

import './scrum.scss';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query ScrumTOC {
        allMarkdownRemark(
          sort: { fields: frontmatter___order }
          filter: { frontmatter: { order: { gt: 0 } } }
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
    render={({ allMarkdownRemark: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Scrum</h1>
              <p class="subtitle">A Brief collection of writings</p>
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
                    <div className="toc-card" key={`scrum-toc-${pageIdx}`}>
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
