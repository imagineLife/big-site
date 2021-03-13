import React from 'react';
// Components
import { Link } from 'gatsby';
import Layout from './../components/layout';
import getPosts from './../hooks/get-posts';
import './index.scss';

const Index = () => {
  const blogPosts = getPosts();
  console.log('blogPosts');
  console.log(blogPosts);

  return (
    <Layout>
      <h1>Hello There</h1>
      <p>I'm a human.</p>
      <Link to="/about">About</Link>
    </Layout>
  );
};
export default Index;
