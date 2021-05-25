import { graphql, useStaticQuery } from 'gatsby';
/*
  fragment postpart on PostsJson {
      slug
      title
      excerpt
    }

    fragment recipepart on RecipesJson {
      slug
      title
      excerpt
    }

    query {
      posts: allPostsJson {
        data: nodes {
          ...postpart
        }
      }
      recipes: allRecipesJson {
        data: nodes {
          ...recipepart
        }
      }
      strengths: allMdx(
        filter: { frontmatter: { slug: { regex: "/strengths/" } } }
      ) {
        data: nodes {
          frontmatter {
            slug
            title
            excerpt
          }
        }
      }
    }
*/
const usePosts = () => {
  const {
    scrum: { nodes: scrumdata },
  } = useStaticQuery(graphql`
    query {
      scrum: allMdx(filter: { frontmatter: { slug: { regex: "/scrum/" } } }) {
        nodes {
          frontmatter {
            slug
            title
            excerpt
          }
        }
      }
    }
  `);
  // ...posts.data,
  // ...recipes.data,
  // ...strengths.data.map(d => d.frontmatter),

  return scrumdata.map(({ frontmatter: { title, slug, excerpt } }) => ({
    title,
    slug,
    excerpt,
  }));
};

export default usePosts;
