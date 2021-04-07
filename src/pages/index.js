import React, { Fragment } from 'react';
import './index.scss';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';

// helper fns
import getPosts from './../hooks/get-posts';
// import getRecipes from './../hooks/get-recipes';

import PostPreview from './../components/PostPreview';
const Index = () => {
  const blogPosts = getPosts();
  console.log('blogPosts');
  console.log(blogPosts);

  return (
    <Fragment>
      <Hero />
      <Layout>
        {blogPosts?.map(bp => (
          <PostPreview key={bp.slug} {...bp} />
        ))}
      </Layout>
    </Fragment>
  );
};
export default Index;
