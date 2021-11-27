import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Toc from './../components/TOC';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query MongoToc {
        mongo: allMarkdownRemark(
          sort: { fields: frontmatter___order }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/mongo/" } }
          }
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
        allDirectory(
          filter: {
            relativePath: { regex: "/mongo/" }
            relativeDirectory: { eq: "mongo" }
          }
        ) {
          dirs: edges {
            node {
              name
            }
          }
        }
      }
    `}
    render={({ mongo: { pages }, allDirectory: { dirs } }) => {
      console.log({ dirs });

      return (
        <Toc title="MongoDB" sub="A Brief collection of writings" pages={pages}>
          <section id="coming-soon">
            <h2> Coming Soon </h2>
            <p>
              Docs organized into categories:{' '}
              {dirs.map(({ node: { name } }, idx) => (
                <span key={`mongo-dir-${name}`}>
                  {name}
                  {idx !== dirs.length - 1 && ', '}
                </span>
              ))}
            </p>
          </section>
        </Toc>
      );
    }}
  />
);

export default IndexPage;
