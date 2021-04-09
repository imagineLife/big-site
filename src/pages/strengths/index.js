import React from 'react';
import { Link, useStaticQuery, query } from 'gatsby';

export default function Strengths() {
  // const strengthsWritings = getStrengthsWritings()
  return (
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
      </p>
    </section>
  );
}
