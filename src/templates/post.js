import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './../components/layout';

/*
  the $slug variable gets set in the gatsby-node file,
  using the slug key in the context object
*/

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`;

// gets the post data as a prop
const PostTemplate = ({ data: { mdx: post } }) => {
  /*
    post.body is a mess to look at but converts to html nicely :)
  */

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <p>Posted by Me</p>
      <MDXRenderer>{post.body}</MDXRenderer>
      <Link to="/">&larr; back to posts</Link>
    </Layout>
  );
};

export default PostTemplate;
