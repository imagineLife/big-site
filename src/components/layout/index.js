import React, { Fragment } from 'react';
import './index.scss';

// Components
import Header from './../header';

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    <main>{children}</main>
  </Fragment>
);

export default Layout;
