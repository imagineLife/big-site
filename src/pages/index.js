import React from 'react';
// Components
import { Link } from 'gatsby';
import Layout from './../components/layout';
import getPosts from './../hooks/get-posts';
// import getRecipes from './../hooks/get-recipes';

import './index.scss';

import PostPreview from './../components/PostPreview';
const Index = () => {
  const blogPosts = getPosts();
  // console.log('blogPosts');
  // console.log(blogPosts);

  return (
    <Layout>
      <h1>Hello There</h1>
      <p>I'm a human.</p>
      <Link to="/about">About</Link>
      <h2>BlogPosts</h2>
      {blogPosts.map(bp => (
        <PostPreview {...bp} key={bp.slug} />
      ))}
    </Layout>
  );
};
export default Index;
