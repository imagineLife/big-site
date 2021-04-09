import './index.scss';
import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <header className="header">
    <Link className="styled bold" to="/">
      Home
    </Link>
    <nav>
      <Link className="styled" activeClassName="current-page" to="/folio">
        Folio
      </Link>
      <Link className="styled" activeClassName="current-page" to="/about">
        About
      </Link>
      <Link className="styled" activeClassName="current-page" to="/posts">
        Posts
      </Link>
      <Link className="styled" activeClassName="current-page" to="/strengths">
        strengths
      </Link>
    </nav>
  </header>
);

export default Header;
