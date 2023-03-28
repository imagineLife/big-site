import React from "react"
import { graphql } from "gatsby"
import PageHead from "../../components/PageHead"
import LayoutWithNav from "../../templates/LayoutWithNav";
 
export default function LinuxBySlug(props) {
  const { data } = props;
  if (!data) return <p>not intended</p>
  
  const { pageData, otherPages } = data
  if (!pageData || !otherPages) return <p>not intended</p>;

  const { content, overview } = pageData;
  if (!content || !overview) return <p>not intended</p>

  const { tags, parentDir } = overview

  const { nodes: theseOtherPages } = otherPages;
  
  return (
    <LayoutWithNav
      navItems={theseOtherPages}
      parentDir={parentDir}
      content={content}
      tags={tags}
    />
  )
}

/*
  NOTE:
  the query params below, frontmatter__shortSlug and frontmatter__parentDir are special
  - they START at / "come from" the "context" values  in gatsby-node create-page parameters
  - the SYNTAX comes from the default export HERE - its params at pageContext.frontmatter__shortSlug
  https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
*/ 
export const LinuxBySlugQuery = graphql`
  query pageBySlug($frontmatter__shortSlug: String) {
    pageData: markdownRemark(
      frontmatter: {
        parentDir: { eq: "linux" }
        shortSlug: { ne: null, eq: $frontmatter__shortSlug }
      }
    ) {
      content: html
      overview: frontmatter {
        order
        parentDir
        title
        excerpt
        slug
        shortSlug
        tags
      }
      wordCount {
        words
      }
    }
    otherPages: allMarkdownRemark(
      filter: {
        frontmatter: {
          slug: { ne: null }
          shortSlug: { ne: null }
          parentDir: { eq: "linux" }
        }
      }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        frontmatter {
          shortSlug
          parentDir
          order
          title
        }
      }
    }
  }
`

export function Head({
  data: { pageData }
}) {
  if (!pageData) return;
  const {
      overview: { title, excerpt, slug, tags },
      wordCount: { words },
    } = pageData 
  
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
