import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Toc from './../components/TOC';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query ScrumTOC {
        scrum: allMarkdownRemark(
          sort: { fields: frontmatter___order }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/scrum/" } }
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
      }
    `}
    render={({ scrum: { pages } }) => {
      return (
        <Toc title="Scrum" sub="A Brief collection of writings" pages={pages} />
      );
    }}
  />
);

export default IndexPage;
