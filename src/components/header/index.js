import './index.scss';
import React from 'react';
import { Link } from 'gatsby';

const headerLinks = [
  {
    txt: 'Folio',
    to: '/folio',
  },
  {
    txt: 'About',
    to: '/about',
  },
  {
    txt: 'Scrum',
    to: '/scrum',
  },
  {
    txt: 'Mongo',
    to: '/mongo',
  },
  {
    txt: 'Node',
    to: '/node',
  }
];
const Header = () => (
  <header className="header">
    <Link className="styled bold" to="/">
      Home
    </Link>
    <nav>
      {headerLinks.map(({ txt, to }, idx) => (
        <Link key={`${txt}-header-link`} className="styled" activeClassName="current-page" to={to}>
          {txt}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
