import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './../components/layout';

const PostTemplate = () => (
  <Layout>
    <p>Posted by Me</p>
    <p>...content here</p>
    <Link to="/">&larr; back to posts</Link>
  </Layout>
);

export default PostTemplate;
