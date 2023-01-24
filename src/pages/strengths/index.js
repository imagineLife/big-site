import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

// Components
import Layout from './../../components/layout';
import Hero from './../../components/hero';

// import './scrum.scss';

const IndexPage = () => (
  // <StaticQuery
  //   query={graphql`
  //     query StrengthsTOC {
  //       strengths: allMarkdownRemark(
  //         sort: { frontmatter: { order: ASC } }
  //         filter: {
  //           frontmatter: { order: { gt: 0 }, slug: { regex: "/strengths/" } }
  //         }
  //       ) {
  //         pages: edges {
  //           page: node {
  //             overview: frontmatter {
  //               slug
  //               title
  //               excerpt
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `}
    // render={({ strengths: { pages } }) => {
      // return (
        <Fragment>
          <Hero />
          <Layout>
            <section className="toc-wrapper">
              <h1>On Strengths</h1>
              <p>
                Some thoughts on how we can view ourselves and one another as
                individuals with natural talents.
              </p>
              {/* {pages.map(
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
              )} */}
            </section>
          </Layout>
        </Fragment>
      // )
    // }}
  // />
)

export default IndexPage;
