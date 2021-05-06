import React, { Fragment } from 'react';
import './index.scss';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';
import PostPreview from './../components/PostPreview';

// helper fns
import getPosts from './../hooks/get-posts';

const Index = () => {
  const blogPosts = getPosts();

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
