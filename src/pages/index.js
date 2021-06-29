import React, { Fragment } from 'react';
import './index.scss';

import { Link } from 'gatsby';
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
          <p>A collection of writings on topics I've been working with</p>
          <Link to="/scrum">Scrum</Link>
          <Link to="/strengths">Personality & "Strengths"</Link>
          {/* <Link to="/node">Node</Link> */}
          {/* <Link to="/frontend">React & Frontend Skills</Link> */}
          {/* <Link to="">Developing Engineer Competencies toward career growth</Link> */}
          <Link to="/recipes">Making Food</Link>
        </section>
      </Layout>
    </Fragment>
  );
};
export default Index;
