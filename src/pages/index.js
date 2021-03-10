import React, { Fragment } from 'react';
// Components
import { Link } from 'gatsby';
import Layout from './../components/layout';

import './index.scss';

const Index = () => (
  <Layout>
    <h1>Hello There</h1>
    <p>I'm a human.</p>
    <Link to="/about">About</Link>
  </Layout>
);
export default Index;
