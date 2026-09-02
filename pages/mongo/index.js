import React, { Fragment } from 'react';
import { getGlobalData, getMongoSections } from '../../utils';
import Layout from './../../components/Layout';
import Hero from './../../components/hero';
import Card from './../../components/Card';
import Link from 'next/link';
import Seo from '../../components/Seo';

const MongoIndex = (props) => {
  return (
    <Fragment>
      <Seo
        title="MongoDB Articles and Certification Notes | Eric Laursen"
        metaDescription="MongoDB study notes and articles covering aggregation, CRUD, schema design, replication, roles, performance, and sharding."
        slug="/mongo"
        jsonLdType="WebPage"
      />
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Mongo</h1>
          <p>
            While studying to get the{' '}
            <Link
              target="_blank"
              href="https://university.mongodb.com/certified_professional_finder/certified_professionals/793573?name=laursen"
            >
              MongoDB Certified Developer
            </Link>
            certification, I did a bit of writing
          </p>
          {props?.sections?.map(({ t, d, url }) => (
            <Card
              key={`mongo-section-${url}`}
              url={url}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              subTitle={d}
            />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default MongoIndex;

export function getStaticProps() {
  const globalData = getGlobalData();
  const mongoSections = getMongoSections();

  return {
    props: {
      globalData,
      sections: mongoSections,
    },
  };
}
