import React from 'react';
import { graphql } from 'gatsby';
import Layout from './../../components/layout';

// export const postQuery = graphql`
//   query PostBySlug($slug: String!) {
//     postsJson(slug: { eq: $slug }) {
//       title
//       excerpt
//     }
//   }
// `;

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
