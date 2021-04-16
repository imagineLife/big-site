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
        listitems {
          itmTitle: title
          itmTxt: content
        }
      }
      footer {
        text
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
        {sections?.map(
          ({ class: sectionClass, title, subTitle, listitems }, sidx) => {
            return (
              <section
                key={`section-${sidx}`}
                className={`section ${sectionClass}`}
              >
                <h3>{title}</h3>
                {subTitle && <sub>{subTitle}</sub>}
                {listitems && (
                  <ul>
                    {listitems?.map(({ itmTitle, itmTxt }, lidx) => (
                      <li key={`list-items-${sidx}-${lidx}`}>
                        {itmTitle && (
                          <span className="itm-title">{itmTitle}</span>
                        )}
                        <span className="itm-txt">{itmTxt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          },
        )}
      </section>
      <footer>
        <Link to={`/${footer.link.url}`}>
          {footer.text} {footer.link.text}
        </Link>
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
