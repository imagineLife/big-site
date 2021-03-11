import './index.scss';
import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <header className="header">
    <Link className="styled" to="/">
      Home
    </Link>
    <nav>
      <Link className="styled" activeClassName="current-page" to="/">
        Home
      </Link>
      <Link className="styled" activeClassName="current-page" to="/about">
        About
      </Link>
    </nav>
  </header>
);

export default Header;
