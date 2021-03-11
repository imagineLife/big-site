import './index.scss';
import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <header>
    <Link className="nav-link" to="/">
      Home
    </Link>
  </header>
);

export default Header;
