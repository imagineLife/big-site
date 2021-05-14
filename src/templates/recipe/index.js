import React from 'react';
import { graphql } from 'gatsby';

import Tag from './../../components/tag';
import Layout from './../../components/layout';
import IngredientList from './../../components/ingredientList';

import './recipe.scss';

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
      directions {
        txt
      }
    }
  }
`;

// gets the post data as a prop
// { data: { mdx: post } }
const RecipeTemplate = data => {
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

export default RecipeTemplate;
