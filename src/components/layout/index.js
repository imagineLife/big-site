import React, { Fragment } from 'react';
import './index.scss';

const Layout = ({ children }) => (
  <Fragment>
    <header></header>
    <main>{children}</main>
  </Fragment>
);

export default Layout;
