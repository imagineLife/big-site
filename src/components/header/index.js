import './index.scss';
import React from 'react';
import { Link } from 'gatsby';

const Header = () => (
  <header>
    <Link className="nav-link" to="/">
      Init
    </Link>
  </header>
);

export default Header;
