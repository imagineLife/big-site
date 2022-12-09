import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Layout from './../components/layout';
import Hero from './../components/hero';
import Helmet from 'react-helmet';
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
          <Helmet>
            <title>Linux & Bash Blog</title>
            <meta
              name="description"
              content="A Blog on Learning A Little Bit of Linux and Bash"
            />
            <meta property="og:title" content="Linux & Bash Blog" />
            <meta property="og:url" content="http://laursen.tech/linux" />
          </Helmet>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>Linux</h1>
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
                    <div className="toc-card" key={`linux-toc-${pageIdx}`}>
                      <Link to={`/${slug}`} className="title">
                        {title}
                      </Link>
                      <p className="content">{excerpt}</p>
                    </div>
                  );
                },
              )}
              <sub>
                Thanks to{' '}
                <Link to={'https://github.com/btholt'}>Brian Holt</Link> and{' '}
                <Link to={'https://frontendmasters.com'}>FrontendMasters</Link>{' '}
                for sparking some curiosity here!
              </sub>
              <br />
              <sub>
                Also, check out{' '}
                <Link to="https://tldp.org/LDP/abs/html/">
                  this in-depth set of write-ups
                </Link>{' '}
                for another look into bash, including lots more details and
                nuiance.
              </sub>
            </section>
          </Layout>
        </Fragment>
      );
    }}
  />
);

export default IndexPage;
