import React from 'react';
import './folio.scss';
import FolioItem from './../components/folioItem';
import TechList from './../components/techList';

const techs = {
  frontend: [
    'D3',
    'React',
    'Webpack',
    'Wireframing',
    'JS',
    'Responsive Design',
    'Enzyme',
    'Jest',
    'Cypress',
    'Travis-CI',
  ],
  backend: [
    'Node (OpenJS Certified Node Application Developer)',
    'Express',
    'Postman',
    'Swagger',
    'REST API',
    'Socket.io',
    'JWT',
    'Mocha',
    'Chai',
  ],
  db: ['MongoDB', 'PostGreSQL', 'MySQL'],
  people: [
    'Certified Professional Scrum Master',
    'Git',
    'GitLab',
    'StrengthFinder Advocate',
    'INTJ',
  ],
};

const folioItems = [
  {
    title: 'OpenJS Certified Node Application Developer',
    subText:
      'Through the linux foundation, certified in leveraging core node apis for interacting with data streams, os modules, filesystems, and more.',
    textContext: 'cert no. LF-0te91c2whv',
    aLink: 'https://training.linuxfoundation.org/certification/verify/',
    techList: [
      'Node Core API',
      'Buffers & Streams',
      'Control Flow',
      'Error Handling',
      'Unit Testing',
    ],
    imgClass: `node-cert-bg`,
  },
  {
    title: 'Certified Professional Scrum Master',
    subText:
      'Scrum is a framework that teams can use to enable team-wide transparency, inspection & adaptation while developing & delivering complex products.',
    aLink: 'https://www.scrum.org/certificates/519854',
    techList: ['Team Process Framework', 'Servant Leadership'],
    imgClass: `psmi-bg`,
  },
  {
    title: 'Slice-n-Dice Times',
    subText:
      "An interactive newspaper-influenced UI, analyzing textual themes in the president's Innaugural Address.",
    aLink: 'https://slice-n-dice-times.herokuapp.com/',
    techList: [
      'D3',
      'Data Vizualization',
      'React',
      'HTML',
      'CSS',
      'JavaScript',
      'Data Analysis',
    ],
    imgClass: 'slice-n-dice-bg',
  },
  {
    title: 'Mastering D3v5',
    subText:
      'An online course I created covering D3v5, interactive mapping, linked visualizations, 3rd party api integration & more.',
    aLink:
      'https://www.packtpub.com/product/mastering-d3-js-5-video/9781789951332',
    techList: [
      'D3',
      'Data Vizualization',
      'Curriculum Development',
      'Audio/Video Recording & Editing',
    ],
    imgClass: 'mastering-bg',
  },
  {
    title: 'Restaurant Node API',
    subText:
      'An API using core Node API, no npm: account & cart management (CRUD), a cli, auth, stripe & mailgun api integration, logging & more.',
    imgClass: 'pizza-bg',
    aLink: 'https://github.com/imagineLife/nodeWork/tree/master/pizzaAPI',
    techList: [
      'Node',
      'JavaScript',
      'Auth',
      'Encryption',
      'Compression + Decompression',
      'cli',
      'logging',
    ],
  },
  {
    title: 'SayWhat?!',
    subText:
      'Look at patterns in the text of presidential inaugural addresses in this data-viz focused, full-stack, mobile-first responsive project.',
    imgClass: 'say-what-bg',
    aLink: 'https://say-what.netlify.com/',
    techList: [
      'D3',
      'React',
      'MongoDB',
      'Express (Node)',
      'Data Visualization',
      'Responsive Design',
      'Text Analysis',
      'HTML',
      'JS',
      'CSS',
    ],
  },
  {
    title: 'WEO Country Categories Mapped',
    subText:
      'Zoom, toggle, & hover in this map of the countries of the world categorically colored by their GNI per capita.',
    imgClass: 'world-map-bg',
    aLink: 'https://imaginelife.github.io/worldMap/',
    techList: [
      'D3',
      'Mapping',
      'GeoJSON (topJSON)',
      'JavaScript',
      'HTML',
      'CSS',
      'Data Visualization',
    ],
  },
  {
    imgClass: 'rhode-island-bg',
    title: 'R.I Stats',
    aLink: 'https://imaginelife.github.io/ristats/',
    subText:
      'Review Poverty & Income levels in Rhode Island through simple charts & maps.',
    techList: [
      'D3',
      'Mapping',
      'GeoJSON (topJSON',
      'JavaScript',
      'HTML',
      'CSS',
      'Data Visualization',
    ],
  },
  {
    title: 'CT Housing Permist, Mapped',
    subText:
      'An interactive choropleth mapping project, representing the range of housing permits issued per town in Connecticut in 2018.',
    aLink: 'https://imaginelife.github.io/stateHousingPermits/',
    imgClass: 'housing-permits-bg',
    techList: [
      'D3',
      'Mapping',
      'Responsive Design',
      'Data Visualization',
      'JS',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Enterprise Resource Planner',
    subText:
      'A time-tracking, ticket-based, resource management system. I do not own the code to this project.',
    imgClass: 'erp-bg',
    techList: ['DHTMLX', 'JS', 'HTML', 'CSS', 'PHP'],
  },
  {
    title: 'MyMiles',
    imgClass: 'my-miles-bg',
    subText:
      'Record, edit & export vehicle mileage logs in this responsive app.',
    aLink: 'https://tranquil-sierra-12911.herokuapp.com/',
    techList: ['API', 'Responsive Design', 'JS', 'HTML', 'CSS'],
  },
  {
    title: 'MacroRecipes',
    subText:
      'Find Recipes based on ingredients and gram counts of carbs, calories, fat, and protein.',
    imgClass: 'macro-recipes-bg',
    aLink: 'https://imaginelife.github.io/MacroRecipes/',
    techList: ['API', 'Responsive Design', 'CSS', 'HTML', 'JS'],
  },
];

export default function Folio() {
  return (
    <main role="main" className="folio">
      <section className="welcome">
        <div className="text-box">
          <p className="intro-text">
            <b>Welcome</b>
            <br />
            Friends & Family call me Jake. <br />I make web-based software.
            <br />
            I also enjoy making data visualizations.
            <br />
          </p>
          <div className="tech-list-box">
            <TechList listName="Frontend" itms={techs.frontend} />
            <TechList listName="Server" itms={techs.backend} />
            <TechList listName="DataBase" itms={techs.db} />
            <TechList listName="Teams & People" itms={techs.people} />
          </div>
        </div>
      </section>

      <section id="projects-wrapper">
        {folioItems.map((itm, itmIdex) => (
          <FolioItem key={`folio-item-${itmIdex}`} {...itm} />
        ))}
      </section>
    </main>
  );
}
