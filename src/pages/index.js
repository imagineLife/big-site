import React, { Fragment } from 'react';
import './index.scss';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';
// import PostPreview from './../components/PostPreview';

// helper fns
// import getPosts from './../hooks/get-posts';

const Index = () => {
  //   const blogPosts = getPosts();
  //   {
  //   blogPosts?.map(bp => <PostPreview key={bp.slug} {...bp} />);
  // }

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="centered">
          <p>A collection of writings on topics I've been working with - </p>
          <ul>
            <li>Scrum</li>
            <li>Personality & "Strengths"</li>
            <li>Node</li>
            <li>React</li>
            <li>Developing Engineer Competencies toward career growth</li>
          </ul>
        </section>
      </Layout>
    </Fragment>
  );
};
export default Index;
