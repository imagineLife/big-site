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
  console.log({ order });

  let footerLinks = [];
  // get previous, current, && next page details
  let prevPage = pages[order - 1 - 1];
  let nextPage = pages[order];

  // FIRST page
  // show HOME dir
  if (order === 1) {
    footerLinks = [
      {
        title: 'Start',
        slug: parentDir,
      },
      { ...nextPage.details },
    ];
  }

  // LAST page
  else if (order === pages.length - 1) {
    footerLinks = [{ ...prevPage.details }];
  }

  //middle pages
  else {
    footerLinks = [{ ...prevPage.details }, { ...nextPage.details }];
  }

  console.log('footerLinks');
  console.log(footerLinks);

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
