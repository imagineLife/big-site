import React, { Fragment } from 'react';

// Components
import { Link } from 'gatsby';
import Layout from './../layout';

const About = () => (
  <Layout>
    <h1>About Me</h1>
    <p>I'm a human.</p>
    <Link to="/">Home</Link>
  </Layout>
);
export default About;
