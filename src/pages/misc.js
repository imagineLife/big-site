import React, { Fragment } from 'react';
import './index.scss';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';

// helper fns
import getMisc from './../hooks/get-misc';

import PostPreview from './../components/PostPreview';

const Index = () => {
  let miscFiles = getMisc();

  return (
    <Fragment>
      <Hero />
      <Layout>
        <h2>Miscellaneous Writings</h2>
        <p>Some yet organized thoughts</p>
        {miscFiles?.map(({ page: { overview } }) => (
          <PostPreview {...overview} key={overview.slug} />
        ))}
      </Layout>
    </Fragment>
  );
};
export default Index;
