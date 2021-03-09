import React, { Fragment } from 'react';
import { Link } from 'gatsby';

const Index = () => (
  <Fragment>
    <h1>Hello There</h1>
    <p>I'm a human.</p>
    <Link to="/about">About</Link>
  </Fragment>
);
export default Index;
