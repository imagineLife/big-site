import React from "react"
import { graphql, Link } from "gatsby"

import Header from "./../../../components/header"
import TagList from "./../../../components/TagList"
import PageHead from "./../../../components/PageHead"

import './index.scss';


/*
  
*/ 
export default function PostBySlug({
  pageContext,
  data: {
    pageData: {
      content,
      overview: { tags, parentDir },
    },
    otherPages: { nodes: otherPages },
  },
  ...props
}) {
  // console.log("props")
  // console.log(props)
  // console.log("otherPages")
  // console.log(otherPages)
  // console.log("pageContext")
  // console.log(pageContext)
  // console.log("shortSlug")
  // console.log(pageContext?.frontmatter__shortSlug)
  // console.log("parentDir")
  // console.log(pageContext?.frontmatter__parentDir)

  return (
    <main className="page-by-slug">
      <Header className="md" />
      <div className="sidebar">
        {otherPages?.map(({ frontmatter: { slug, title } }, pidx) => (
          <Link key={`${pidx}-${slug}`} to={`/by-slug/${slug}`}>
            {title}
          </Link>
        ))}
        <a>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </a>
      </div>
      <section role="region" className="md-wrapper">
        <section
          className={`${parentDir ? ` ${parentDir}` : ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
        ></section>
        <TagList tags={tags} />
      </section>
    </main>
  )
}

/*
  NOTE:
  the query params below, frontmatter__shortSlug and frontmatter__parentDir are special
  - they START at / "come from" the "context" values  in gatsby-node create-page parameters
  - the SYNTAX comes from the default export HERE - its params at pageContext.frontmatter__shortSlug
  https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
*/ 
export const BySlugQuery = graphql`
  query pageBySlug(
    $frontmatter__shortSlug: String
    $frontmatter__parentDir: String
  ) {
    pageData: markdownRemark(
      frontmatter: { shortSlug: { eq: $frontmatter__shortSlug } }
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
