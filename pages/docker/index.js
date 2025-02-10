import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import PostLink from '../../components/PostLink';

const DockerIndex = (params) => {
  const myPages = {
    intro: [],
    node: [],
  };
  params.posts.forEach((p) => {
    if (p.slug.includes('node-')) {
      myPages.node.push(p);
    } else {
      myPages.intro.push(p);
    }
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Docker</h1>
          <h2
            id="getting-started"
            title="Thanks to Brian Holt from Frontend Masters for Sparking some Curiosity here!"
          >
            Getting Started
          </h2>
          {myPages.intro.map((itm) => (
            <PostLink {...itm} key={`docker-node-${itm.title}`} />
          ))}
          <h2 id="docker-node-intro">Docker With Node: An Intro</h2>
          {myPages.node.map((itm) => (
            <PostLink {...itm} key={`docker-node-${itm.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default DockerIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('docker');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
