import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
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
        <section className="toc-wrapper">
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
                  <p className="title">{title}</p>
                  <p className="content">{excerpt}</p>
                </div>
              );
            },
          )}
        </section>
      );
    }}
  />
);

export default IndexPage;
