import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import { MDXProvider } from '@mdx-js/react';

import Tag from './../../components/tag';
import Layout from './../../components/layout';
import IngredientList from './../../components/ingredientList';

import './post.scss';

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    postsJson(slug: { eq: $slug }) {
      title
      excerpt
    }
  }
`;

const PostTemplate = data => {
  const {
    data: {
      postsJson: { title, excerpt },
    },
  } = data;

  return (
    <Layout>
      <div className="recipe-header">
        <h1>{title}</h1>
        <p>{excerpt}</p>
      </div>
    </Layout>
  );
};

export default PostTemplate;
