import React from 'react';
import { Link } from 'gatsby';
import getStrengths from './../../hooks/get-strengths';

// Components
import PostPreview from './../../components/PostPreview';
import Layout from './../../components/layout';

export default function Strengths() {
  const strengthsSlugs = getStrengths();

  return (
    <Layout>
      <section id="strengths-list">
        <h1>Personality & Strengths</h1>
        <p>
          Welcome to this section of my blog, highlighting some thoughts and
          experiences about personalities and{' '}
          <Link
            target="_blank"
            to="https://www.gallup.com/cliftonstrengths/en/home.aspx"
          >
            StrengthsFinder
          </Link>
          .
        </p>

        <div id="strengths-post-list">
          {strengthsSlugs?.map(({ title, excerpt, slug }, idx) => (
            <PostPreview
              key={`strengths-post-preview-${idx}`}
              {...{ title, excerpt, slug }}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
