import React from 'react';
import Layout from './../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/Breadcrumbs/index.tsx';
import PostLink from '../../components/PostLink';

import { getMdPostSummaries, getGlobalData } from '../../utils';

const LinuxIndex = (params) => {
  return (
    <Layout>
      <Seo
        title={params.globalData.name}
        description={params.globalData.blogTitle}
      />
      <Header name={params.globalData.name} />
      <section className="mt-[80px] max-w-[90%]">
        <BreadCrumbs slugs={['linux']} />
        <h1>Linux & Bash</h1>
        {params?.posts?.map((itm) => (
          <PostLink {...itm} key={`linux-post-${itm.title}`} />
        ))}
      </section>
    </Layout>
  );
};

export default LinuxIndex;

export async function getStaticProps(p) {
  const posts = await getMdPostSummaries('linux');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
