import React from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';
import Seo from '../../components/Seo';

const MlIndex = ({ posts }) => {
  return (
    <>
      <Seo
        title="Machine Learning Articles and Experiments | Eric Laursen"
        metaDescription="Machine learning articles and experiments covering object detection, model exploration, and applied ML concepts."
        slug="/ml"
        jsonLdType="WebPage"
      />
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Machine Learning</h1>
          <p>I&apos;m beginning to dabble with some machine learning:</p>
        </section>
        <section>
          {posts?.map((p) => (
            <PostLink key={`machine-learning-toc-post-${p.title}`} {...p} />
          ))}
        </section>
      </Layout>
    </>
  );
};

export default MlIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('ml');
  const globalData = getGlobalData();
  return { props: { posts, globalData } };
}
