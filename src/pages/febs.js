import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import PostPreview from './../components/PostPreview';

import './scrum.scss';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      fragment febspart on FebsJson {
        slug
        title
        order
      }
      query {
        febs: allFebsJson {
          pages: nodes {
            ...febspart
          }
        }
      }
    `}
    render={({ febs: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Scrum</h1>
              <p className="subtitle">A Frontend Build System</p>
              {pages
                .sort((a, b) => (a.order > b.order ? 1 : -1))
                .map(
                  (
                    { slug, title }, //excerpt
                    pageIdx,
                  ) => {
                    return (
                      <div className="toc-card" key={`scrum-toc-${pageIdx}`}>
                        <Link to={`/${slug}`} className="title">
                          {title}
                        </Link>
                        {/* <p className="content">{excerpt}</p> */}
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
