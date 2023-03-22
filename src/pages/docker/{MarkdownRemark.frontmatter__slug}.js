import React from "react"
import { graphql, Link } from "gatsby"

import Header from "../../components/header"
import TagList from "../../components/TagList"

// import './index.scss';


/*
  
*/ 
export default function DockerPageBySlug({
  data: {
    pageData: {
      content,
      overview: { tags, parentDir },
    },
    otherPages: { nodes: otherPages },
  },
  // pageContext,
  // ...props
}) {
  return (
    <main className="page-by-slug">
      <Header className="md" />
      <div className="sidebar">
        {otherPages?.map(({ frontmatter: { slug, title } }, pidx) => (
          <Link key={`${pidx}-${slug}`} to={`/docker/${slug}`}>
            {title}
          </Link>
        ))}
        {/* <a>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </a> */}
      </div>
      <section className="md-wrapper">
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
  the query params below, frontmatter__slug and frontmatter__parentDir are special
  - they START at / "come from" the "context" values  in gatsby-node create-page parameters
  - the SYNTAX comes from the default export HERE - its params at pageContext.frontmatter__slug
  https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
*/ 
export const DockerBySlugQuery = graphql`
  query dockerPageBySlug(
    $frontmatter__slug: String
  ) {
    pageData: markdownRemark(
      frontmatter: { slug: { eq: $frontmatter__slug } }
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
          parentDir: { eq: "docker" }
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