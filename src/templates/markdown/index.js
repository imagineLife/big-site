import React from 'react';
import { graphql, Link } from 'gatsby';

export default function Template({
  data: {
    markdownRemark: { overview, content },
  },
}) {
  return (
    <div
      className="scrum-container"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

export const pageQuery = graphql`
  query ScrumBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      overview: frontmatter {
        slug
        title
        tags
      }
      content: html
    }
  }
`;
