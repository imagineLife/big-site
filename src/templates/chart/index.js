import React from 'react';
import { graphql, Link } from 'gatsby';
import './index.scss';
import ChartScrollBox from './../../components/chartScrollBox';

export const chartQuery = graphql`
  query ChartsBySlug($slug: String!) {
    chartsJson(slug: { eq: $slug }) {
      title
      slug
      excerpt
      explanations
      sections {
        box {
          data
          itm
        }
        column {
          data
          itm
        }
        className
        interactiveStateWrapper
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

export default function ChartsTemplate(apiData) {
  const {
    data: {
      chartsJson: { title, sections, explanations, footer },
    },
  } = apiData;

  return (
    <main className="chart-detail">
      <h1>{title || 'A Chart'}</h1>
      {explanations && (
        <section className="explanation">
          {explanations?.map((txt, txtIdx) => (
            <p key={`explanation-${txtIdx}`}>{txt}</p>
          ))}
        </section>
      )}
      <ChartScrollBox {...{ title, explanations, sections }} />
      {footer && (
        <footer>
          <Link to={`/${footer.link.url}`}>
            {footer.text} {footer.link.text}
          </Link>
        </footer>
      )}
    </main>
  );
}
