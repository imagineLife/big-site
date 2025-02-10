import React from 'react';
import Card from './../../components/Card';
import GenericPost from './../../components/GenericPost';
import { getGlobalData, getNodeSections } from '../../utils';

export default function NodeIndex({ sections }) {
  return (
    <GenericPost
      {...{
        title: 'Node',
        excerpt: 'JavaScript on a server',
        slug: 'node',
        tags: ['node'],
        slugArr: ['node'],
      }}
    >
      <>
        <h1>Node</h1>
        <section className="flex gap-3 p-5 flex-wrap">
          {sections?.map((s) => (
            <Card key={s.t} title={s.t} subTitle={s.d} url={s.url} />
          ))}
        </section>
      </>
    </GenericPost>
  );
}

export const getStaticProps = async ({ params, ...rest }) => {
  const globalData = getGlobalData();
  const nodeSections = getNodeSections();

  return {
    props: {
      globalData,
      sections: nodeSections,
    },
  };
};
