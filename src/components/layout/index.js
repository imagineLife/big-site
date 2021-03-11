import React, { Fragment } from 'react';
import './index.scss';

// Components
import Header from './../header';
import PageHeader from './../PageHeader';

const Layout = ({ children }) => (
  <Fragment>
    <PageHeader />
    <Header />
    <main>{children}</main>
  </Fragment>
);

export default Layout;
