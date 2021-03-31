import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import { MDXProvider } from '@mdx-js/react';

import Tag from './../components/tag';
import Layout from './../components/layout';
import IngredientList from './../components/ingredientList';

import './post.scss';

export const recipeQuery = graphql`
  query RecipeBySlug($slug: String!) {
    recipesJson(slug: { eq: $slug }) {
      title
      tags
      excerpt
      ingredients {
        ingredient
        amt
      }
    }
  }
`;

/*
  the $slug variable gets set in the gatsby-node file,
  using the slug key in the context object
*/

// export const query = graphql`
//   query($slug: String!) {
//     mdx(frontmatter: { slug: { eq: $slug } }) {
//       frontmatter {
//         title
//         author
//       }
//       body
//     }
//   }
// `;

// export const query = graphql`
//   query {
//     imperfectBarsJson {
//       title
//       slug
//       excerpt
//       tags
//       coverImage {
//         childImageSharp {
//           fluid {
//             src
//           }
//         }
//       }
//     }
//   }
// `;

// gets the post data as a prop
// { data: { mdx: post } }
const PostTemplate = data => {
  const {
    data: {
      recipesJson: { title, excerpt, tags, ingredients },
    },
  } = data;

  return (
    <Layout>
      <div className="recipe-header">
        <h1>{title}</h1>
        <p>{excerpt}</p>
        {tags?.map((t, idx) => (
          <Tag key={`tag-${idx}`} text={t} />
        ))}
        {ingredients && <IngredientList>{ingredients}</IngredientList>}
      </div>
    </Layout>
  );
};

export default PostTemplate;
