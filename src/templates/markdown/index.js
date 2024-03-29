import React, { Fragment } from "react"
import { graphql } from "gatsby"
import "./index.scss"
import Header from "./../../components/header"
import TagList from "./../../components/TagList"
import PageHead from "./../../components/PageHead"

export default function Template({
  data: {
    pageData: {
      content,
      overview: { order, parentDir, tags },
    },
    pageSummaries: { pages },
  },
}) {
  /*
    get footer links
    - figure out parent dir
  */

  let footerLinks

  // ONLY create footer links when order is explicit in frontmatter
  if (order !== null && parentDir !== null) {
    //   console.log('pages.details');
    //   console.log(pages.map((d) => d.details));
    //   console.log('parentDir');
    //   console.log(parentDir);
    // console.log(
    //   `ORDER: ${order} - - PAGES: ${pages.length} - - - parentDir: ${parentDir}`,
    // );

    footerLinks = []
    // get previous, && next page details
    let prevPage = pages[order - 1 - 1]
    let nextPage = pages[order]

    // FIRST page
    // show HOME dir
    if (order === 1) {
      prevPage = {
        title: "Start",
        slug: parentDir,
      }

      footerLinks = [{ ...prevPage }]
      if (nextPage) {
        footerLinks.push({ ...nextPage.details })
      }
    }
    // LAST page
    else if (order === pages.length) {
      footerLinks = [{ ...prevPage.details }]
    }

    //middle pages
    else {
      if (nextPage) {
        footerLinks = [{ ...prevPage.details }, { ...nextPage.details }]
      }
    }
  }

  return (
    <Fragment>
      <main className={`md-wrapper${parentDir ? ` ${parentDir}` : ""}`}>
        <Header className="md" />
        <TagList tags={tags} />
        <section dangerouslySetInnerHTML={{ __html: content }} role="article"></section>
      </main>
      <footer className="md-footer">
        {/* <div id="link-wrapper">
          {pages.length > 1 &&
            footerLinks?.map(({ slug, title }, idx) => {
              if (idx === 0) {
                return (
                  <Link key={`footer-link-${title}`} to={`/${slug}`}>
                    Prev: {title}
                  </Link>
                )
              } else {
                return (
                  <Link key={`footer-link-${title}`} to={`/${slug}`}>
                    Next: {title}
                  </Link>
                )
              }
            })}
        </div> */}
      </footer>
    </Fragment>
  )
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
        tags
      }
      timeToRead
      wordCount {
        words
      }
    }
    pageSummaries: allMarkdownRemark(
      sort: { frontmatter: { order: ASC } }
      filter: { frontmatter: { parentDir: { eq: $parentDir } } }
    ) {
      pages: nodes {
        details: frontmatter {
          slug
          title
          parentDir
          order
        }
        timeToRead
      }
    }
  }
`

export function Head({
  data: {
    pageData: {
      overview: { title, excerpt, slug, tags },
      timeToRead,
      wordCount: { words },
    },
  },
}) {
  return (
    <PageHead
      {...{
        title,
        excerpt,
        slug,
        words,
        tags,
      }}
    />
  )
}
