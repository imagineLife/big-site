import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import './index.scss';

export default function Template({
  data: {
    pageData: { overview, content },
    pageSummaries: { pages },
  },
}) {
  const footerLinks = pages.reduce(
    (resArr, { page: { overview: pg } }, pgIdx) => {
      // get previous, current, && next page details
      if (pgIdx !== overview.order - 1 && pgIdx !== overview.order + 1)
        return resArr;
      else {
        return [...resArr, pg];
      }
    },
    [],
  );

  return (
    <Fragment>
      <main
        className="md-wrapper"
        dangerouslySetInnerHTML={{ __html: content }}
      ></main>
      <footer className="md-footer">
        <div id="link-wrapper">
          {footerLinks?.map(({ slug, title }, idx) => (
            <Link key={`footer-link-${title}`} to={`/${slug}`}>
              {title}
            </Link>
          ))}
        </div>
      </footer>
    </Fragment>
  );
}

export const pgQuery = graphql`
  query ScrumBySlug($slug: String!) {
    pageData: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      overview: frontmatter {
        slug
        title
        tags
        order
      }
      content: html
    }
    pageSummaries: allMarkdownRemark(sort: { fields: frontmatter___order }) {
      pages: edges {
        page: node {
          overview: frontmatter {
            slug
            title
            order
          }
        }
      }
    }
  }
`;
