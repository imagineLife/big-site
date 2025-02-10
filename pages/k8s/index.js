import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

const KubeIndex = (params) => {
  let rootPages = [];
  let inDepthPages = [];
  let networkingPages = [];

  // categorize into "Getting Started" and "In-Depth"
  params.posts.forEach((p) => {
    if (p.slug.includes('networking-intro')) {
      networkingPages.push(p);
    } else if (p.slug.includes('in-depth')) {
      inDepthPages.push(p);
    } else {
      rootPages.push(p);
    }
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper p-[5%]">
          <h1>K8s</h1>
          <h2 className=" mt-[3rem] mb-[3rem]">Getting Started</h2>
          {rootPages?.map((p) => (
            <PostLink {...p} key={`k8s-summary-ling-${p.title}`} />
          ))}
          <h2>Networking Intro</h2>
          {networkingPages?.map((p) => (
            <PostLink {...p} key={`k8s-networking-${p.title}`} />
          ))}
          <h2 className=" mt-[3rem] mb-[3rem]">In-Depth</h2>
          {inDepthPages?.map((p) => (
            <PostLink {...p} key={`k8s-in-depth-${p.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default KubeIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('k8s', true);
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
