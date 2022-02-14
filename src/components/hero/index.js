import React from 'react';
import './index.scss';
import { Link, graphql, useStaticQuery } from 'gatsby';
import DivWrapper from './../divWrapper';
import BackgroundImage from 'gatsby-background-image';

function Hero({ windowWidth }) {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "farm.jpg" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      Tag="section"
      fluid={image.sharp.fluid}
      fadeIn="soft"
      style={{
        backgroundPosition: `top 20% center`,
        backgroundSize: 'cover',
        height: windowWidth < 500 ? '30vh' : `50vh`,
      }}
      className="hero"
    >
      <DivWrapper id="text-wrapper">
        {/* <h1>Blog</h1> */}
        <p>
          <Link to="/about">About Me &rarr;</Link>
        </p>
      </DivWrapper>
    </BackgroundImage>
  );
}

export default Hero;
