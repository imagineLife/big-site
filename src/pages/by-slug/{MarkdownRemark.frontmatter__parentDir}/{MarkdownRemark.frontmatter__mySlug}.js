import React from "react"
import { graphql } from "gatsby"

export default function PostBySlug({ pageContext, ...props }) {
  console.log("props")
  console.log(props)
  console.log("DATA")
  console.log(props.data)
  console.log("pageContext")
  console.log(pageContext)
  console.log("mySlug")
  console.log(pageContext?.frontmatter__mySlug)
  console.log("parentDir")
  console.log(pageContext?.frontmatter__parentDir)

  return (
    <main className="chart-wrapper">
      <h2>Post By Slug Here</h2>
    </main>
  )
}

export const BySlugQuery = graphql`
  query pageBySlug(
    $frontmatter__mySlug: String
    $frontmatter__parentDir: String
  ) {
    pageData: markdownRemark(
      frontmatter: { mySlug: { eq: $frontmatter__mySlug } }
    ) {
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
    otherPages: allMarkdownRemark(
      filter: {
        frontmatter: {
          slug: { ne: null }
          parentDir: { eq: $frontmatter__parentDir }
        }
      }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          parentDir
          order
          title
        }
      }
    }
  }
`
