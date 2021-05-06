import { graphql, useStaticQuery } from 'gatsby';

const usePosts = () => {
  const { posts, recipes } = useStaticQuery(graphql`
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
    }
  `);

  return [...posts.data, ...recipes.data].map(({ title, slug, excerpt }) => ({
    title,
    slug,
    excerpt,
  }));
};

export default usePosts;
