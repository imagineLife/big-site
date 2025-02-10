import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

const SocialWorldIndex = (params) => {
  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper p-[5%]">
          {params?.posts?.map((p) => (
            <PostLink {...p} key={`the-social-world-${p.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default SocialWorldIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('the-social-world', true);
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
