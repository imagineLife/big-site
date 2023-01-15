import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
function pluralize({ str, variable }) {
  return variable === 1 ? str : `${str}s`
}
const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} ${pluralize({ str: 'post', value: totalCount})} tagged with "${tag}"`

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node: { fields: { slug }, frontmatter: { title, excerpt } } }) => {
          return (
            // <li key={slug}>
            //   <Link to={slug}>{title}</Link>
            // </li>
            <div className="toc-card" key={`tags-list-item-${title}`}>
              <Link to={slug} className="title">
                {title}
              </Link>
              <p className="content">{excerpt}</p>
            </div>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          slug: { regex: "/^((?!k8s/examples).)*$/" }
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
          }
        }
      }
    }
  }
`
