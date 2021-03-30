import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import { MDXProvider } from '@mdx-js/react';
import Layout from './../components/layout';
import IngredientList from './../components/ingredientList';

import './post.scss';

function Tag({ text }) {
  return <span className="tag">{text}</span>;
}

export const recipeQuery = graphql`
  query RecipeBySlug($slug: String!) {
    recipesJson(slug: { eq: $slug }) {
      title
      tags
      excerpt
    }
  }
`;

/*
  the $slug variable gets set in the gatsby-node file,
  using the slug key in the context object
*/

const components = {
  ul: IngredientList,
};

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
      recipesJson: { title, excerpt, tags },
    },
  } = data;
  // console.log('recipesJson');
  // console.log(recipesJson);
  // const postData = useThisPost(data)
  /*
    post.body is a mess to look at but converts to html nicely :)
  */

  return (
    <Layout>
      <div className="recipe-header">
        <h1>{title}</h1>
        <p>{excerpt}</p>
        {tags?.map((t, idx) => (
          <Tag key={`tag-${idx}`} text={t} />
        ))}
      </div>
    </Layout>
  );
};

export default PostTemplate;
