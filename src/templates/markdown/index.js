import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import './index.scss';

export default function Template({
  data: {
    pageData: {
      content,
      overview: { order, parentDir },
    },
    pageSummaries: { pages },
  },
}) {
  const footerLinks =
    pages.length > 1 &&
    pages.reduce((resArr, itm, pgIdx) => {
      // get previous, current, && next page details
      let prevPage = pages[pgIdx - 1];
      let nextPage = pages[pgIdx + 1];
      let isLastPage = pgIdx === resArr.length - 1;

      // first page
      // show HOME dir
      if (order === 1 && pgIdx === 0) {
        return [
          ...resArr,
          ...[
            {
              title: 'Start',
              slug: parentDir,
            },
            { ...nextPage.details },
          ],
        ];
      } else {
        if (order === 1) {
          return resArr;
        }

        if (pgIdx !== order - 1 && pgIdx !== order + 1) return resArr;
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
          {pages.length > 1 &&
            footerLinks.map(({ slug, title }, idx) => {
              if (idx === 0) {
                return (
                  <Link key={`footer-link-${title}`} to={`/${slug}`}>
                    Prev: {title}
                  </Link>
                );
              } else {
                return (
                  <Link key={`footer-link-${title}`} to={`/${slug}`}>
                    Next: {title}
                  </Link>
                );
              }
            })}
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
        parentDir
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
          parentDir
          order
        }
      }
    }
  }
`;
