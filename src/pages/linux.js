import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';

import './scrum.scss';

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
    render={({ linux: { pages } }) => {
      return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Linux</h1>
              {/* {pages.map(
                (
                  {
                    page: {
                      overview: { slug, title, excerpt },
                    },
                  },
                  pageIdx,
                ) => {
                  return (
                    <div className="toc-card" key={`linux-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  );
                },
              )} */}
              {/* <div className="coming-soon">
                <p>
                  More to come: testing integrations, code-coverage assurance
                  with pre-push husky checks, linting, and more!
                </p>
              </div> */}
              <sub>
                Thanks to{' '}
                <Link to={'https://github.com/btholt'}>Brian Holt</Link> and{' '}
                <Link to={'https://frontendmasters.com'}>FrontendMasters</Link> for sparking some curiosity here!
              </sub>
            </section>
          </Layout>
        </Fragment>
      );
    }}
  />
);

export default IndexPage;