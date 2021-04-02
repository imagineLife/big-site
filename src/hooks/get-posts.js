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
/*
  fluid can get content like...
  (
    maxWidth: 100
    maxHeight: 100
    duotone: { shadow: "#663399", highlight: "#ddbbff" }
  )
  before the {}
*/

/*
  mdx-drived static query
  query {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
            author
            excerpt
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    } 
*/
