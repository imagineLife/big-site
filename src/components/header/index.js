import './index.scss';
import React from 'react';
import { Link } from 'gatsby';
import linkedIn from './../../pages/about/linkedin.svg';
import github from "./../../pages/about/github.svg"
import './index.scss';

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

const headerContactLinks = [
  {
    to: "https://www.linkedin.com/in/eric-laursen-6a1b20b8/",
    src: linkedIn,
  },
  {
    to: "https://github.com/imagineLife",
    src: github,
  },
] 

const Header = ({className}) => (
  <header aria-label="Primary" className={`header ${className}`}>
    <Link className="styled bold" to="/" aria-label="Homepage">
      Home
    </Link>
    <nav aria-label="Primary">
      {headerLinks.map(({ txt, to }, idx) => { 
        const props = {
          key: `${txt}-header-link`,
            className: "styled",
            activeClassName: "current-page",
            to
        }
        if (idx === 0) props.tabIndex = 0;
        return (
          <Link {...props}>
            {txt}
          </Link>
        )
      })}
    </nav>
    <div id="header-links-wrapper" style={{minWidth: '80px'}}>
      {headerContactLinks.map(d => (
        <a href={d.to} target="_blank" key={d.to} style={{
          margin: 'auto',
          height: '20px',
          width: '20px',
        }}>
          <img style={{ width: "20px", height: '20px' }} src={d.src} alt={d.to} />
        </a>
      ))}
    </div>
  </header>
);

export default Header;
