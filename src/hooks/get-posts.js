import { graphql, useStaticQuery } from 'gatsby';

const usePosts = () => {
  const { posts, recipes, strengths } = useStaticQuery(graphql`
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
  `);

  return [
    ...posts.data,
    ...recipes.data,
    ...strengths.data.map(d => d.frontmatter),
  ].map(({ title, slug, excerpt }) => ({
    title,
    slug,
    excerpt,
  }));
};

export default usePosts;
