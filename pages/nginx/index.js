import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

const LinuxIndex = (params) => {
  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Nginx</h1>
          {params?.posts?.map((itm) => (
            <PostLink {...itm} key={`nginx-post-${itm.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default LinuxIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('nginx');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
