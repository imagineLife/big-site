import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Toc from './../components/TOC';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query NodeToc {
        node: allMarkdownRemark(
          sort: { fields: frontmatter___order }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/node/" } }
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
    render={({ node: { pages } }) => {
      return (
        <Toc title="NodeJS" sub="Node APIs & WebServer Details" pages={pages} />
      );
    }}
  />
);

export default IndexPage;
