import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import './index.scss';

export default function Template({
  data: {
    pageData: {
      content,
      overview: { order },
    },
    pageSummaries: { pages },
  },
}) {
  const footerLinks = pages.reduce((resArr, itm, pgIdx) => {
    // get previous, current, && next page details
    if (pgIdx !== order - 1 && pgIdx !== order + 1) return resArr;
    else {
      return [...resArr, itm.details];
    }
  }, []);

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
  query MarkdownBySlug($slug: String!, $parentDir: String!) {
    pageData: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      content: html
      overview: frontmatter {
        order
      }
    }
    pageSummaries: allMarkdownRemark(
      sort: { fields: frontmatter___order }
      filter: { frontmatter: { parentDir: { eq: $parentDir } } }
    ) {
      pages: nodes {
        details: frontmatter {
          slug
          title
        }
      }
    }
  }
`;
