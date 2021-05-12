import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImg from 'gatsby-image';

export default function DirectionList({ children }) {
  return <section className="direction-list">{children && children}</section>;
}
