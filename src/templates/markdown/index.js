import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import './index.scss';

export default function Template({
  data: {
    pageData: {
      content,
      overview: { order, parentDir, title, excerpt, slug },
    },
    pageSummaries: { pages },
  },
}) {
  

  /*
    get footer links
    - figure out parent dir
  */ 
  

  let footerLinks;

  // ONLY create footer links when order is explicit in frontmatter
  if (order !== null && parentDir !== null) {
    //   console.log('pages.details');
    //   console.log(pages.map((d) => d.details));
    //   console.log('parentDir');
    //   console.log(parentDir);
    // console.log(
    //   `ORDER: ${order} - - PAGES: ${pages.length} - - - parentDir: ${parentDir}`,
    // );

    footerLinks = [];
    // get previous, && next page details
    let prevPage = pages[order - 1 - 1];
    let nextPage = pages[order];

    // FIRST page
    // show HOME dir
    if (order === 1) {
      prevPage = {
        title: 'Start',
        slug: parentDir,
      };

      footerLinks = [{ ...prevPage }];
      if (nextPage) {
        footerLinks.push({ ...nextPage.details });
      }
    }
    // LAST page
    else if (order === pages.length) {
      footerLinks = [{ ...prevPage.details }];
    }

    //middle pages
    else {
      if (nextPage) {
        footerLinks = [{ ...prevPage.details }, { ...nextPage.details }];
      }
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>{title || 'Jake Laursen Blog'}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`http://laursen.tech${slug}`} />
      </Helmet>
      <main
        className={`md-wrapper${parentDir ? ` ${parentDir}` : ''}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></main>
      <footer className="md-footer">
        <div id="link-wrapper">
          {pages.length > 1 &&
            footerLinks?.map(({ slug, title }, idx) => {
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
        title
        excerpt
        slug
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
