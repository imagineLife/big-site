import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import { MDXProvider } from '@mdx-js/react';

import Tag from './../../components/tag';
import Layout from './../../components/layout';
import IngredientList from './../../components/ingredientList';

import './index.scss';

export const febsQuery = graphql`
  query FebsBySlug($slug: String!) {
    febsJson(slug: { eq: $slug }) {
      slug
      title
      sections {
        class
        title
        subTitle
      }
      footer {
        link {
          text
          url
        }
      }
    }
  }
`;

// gets the post data as a prop
const FebsTemplate = data => {
  const {
    data: {
      febsJson: { title, sections, footer },
    },
  } = data;

  console.log('sections');
  console.log(sections);

  return (
    <Layout>
      <section className="febs-wrapper">
        <h1>{title}</h1>
        <p>body will go here</p>
      </section>
      <footer>
        <Link to={`/${footer.link.url}`}>{footer.link.text}</Link>
      </footer>
    </Layout>
  );
};

export default FebsTemplate;
/*
  {
  tags?.map((t, idx) => <Tag key={`tag-${idx}`} text={t} />);
}

*/
