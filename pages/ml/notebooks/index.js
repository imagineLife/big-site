import React from 'react';
import { getPosts, getGlobalData } from '../../../utils';
import Layout from './../../../components/Layout';
import Hero from './../../../components/hero';
import PostLink from '../../../components/PostLink';

/*
  before filter

  re-introduce in frontmatter when done-zo
  order: { gt: 0 }
*/
const MlNotebooksIndex = ({ posts }) => {
  return (
    <>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Machine Learning Notebooks</h1>
          <p>Some more dabbling...</p>
        </section>
        <section>
          {posts?.map((p) => (
            <PostLink
              key={`machine-learning-toc-post-${p}`}
              slug={`ml/notebooks/${p}`}
              title={p}
              // excerpt={'mic check'}
            />
          ))}
        </section>
      </Layout>
    </>
  );
};

export default MlNotebooksIndex;

export function getStaticProps() {
  const posts = getPosts('notebooks');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
