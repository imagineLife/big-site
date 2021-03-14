import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './../components/layout';

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

const PostTemplate = ({ data: { mdx: post } }) => {
  console.log('post');
  console.log(post.body);

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
