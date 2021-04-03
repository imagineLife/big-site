import React, { Fragment } from 'react';
import './folio.scss';

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
    'Node',
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

function TechList({ listName, itms }) {
  return (
    <ul className="tech-list">
      <li className="tech-li title">
        <b>{listName}</b>
      </li>
      <br />
      {itms.map((t, tIdx) => (
        <Fragment key={`frontend-${listName}-${tIdx}`}>
          <li className="tech-li">{t}</li>
          {tIdx !== itms.length < 1 && ' '}
        </Fragment>
      ))}
    </ul>
  );
}

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
];

function FolioItem({ title, subText, textContext, aLink, techList, imgClass }) {
  return (
    <div className="col-3-4 hover-v2">
      <div target="_blank" className={`box ${imgClass} `}>
        <div className="caption">
          <p>{title}</p>
          <hr />
          <p className="sub-text">
            {subText}
            <br />
            {textContext && (
              <sup>
                <i>{textContext}</i>
              </sup>
            )}
          </p>
          <a href={aLink} target="_blank" className="open"></a>
          <ul>
            {techList.map((itm, itmIdx) => (
              <li key={`tech-list-${title}-${itmIdx}`}>{itm}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

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

        <div className="col-3-4 hover-v2">
          <div className="box say-what-bg">
            <div className="caption">
              <p>SayWhat?!</p>
              <hr />
              <p className="sub-text">
                Look at patterns in the text of presidential inaugural addresses
                in this data-viz focused, full-stack, mobile-first responsive
                project.
              </p>
              <div className="link-box">
                <a
                  href="https://say-what.netlify.com/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/say-what"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>D3</li>
                <li>React</li>
                <li>MongoDB</li>
                <li>
                  Express <i>(Node)</i>
                </li>
                <li>Data Visualization</li>
                <li>Responsive Design</li>
                <li>Text Analysis</li>
                <li>HTML</li>
                <li>JS</li>
                <li>CSS</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div
            className="box world-map-bg"
            href="https://imaginelife.github.io/worldMap/"
            target="_blank"
          >
            <div className="caption">
              <p>WEO Country Categories Mapped</p>
              <hr />
              <p className="sub-text">
                Zoom, toggle, & hover in this map of the countries of the world
                categorically colored by their GNI per capita.
              </p>
              <div className="link-box">
                <a
                  href="https://imaginelife.github.io/worldMap/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/worldMap"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>D3</li>
                <li>Mapping</li>
                <li>
                  GeoJSON <i>(topJSON)</i>
                </li>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>Data Visualization</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div
            className="box rhode-island-bg"
            href="https://imaginelife.github.io/ristats/"
            target="_blank"
          >
            <div className="caption">
              <p>R.I Stats</p>
              <hr />
              <p className="sub-text">
                Review Poverty & Income levels in Rhode Island through simple
                charts & maps.
              </p>
              <div className="link-box">
                <a
                  href="https://imaginelife.github.io/ristats/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/ristats"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>D3</li>
                <li>Mapping</li>
                <li>
                  GeoJSON <i>(topJSON)</i>
                </li>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>Data Visualization</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div className="box housing-permits-bg">
            <div className="caption">
              <p>CT Housing Permits, Mapped</p>
              <hr />
              <p className="sub-text">
                An interactive choropleth mapping project, representing the
                range of housing permits issued per town in Connecticut in 2018.
              </p>
              <div className="link-box">
                <a
                  href="https://imaginelife.github.io/stateHousingPermits/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/stateHousingPermits"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>D3</li>
                <li>Mapping</li>
                <li>Responsive Design</li>
                <li>Data Visualization</li>
                <li>JS</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div className="box erp-bg">
            <div className="caption">
              <p>Enterprise Resource Planner</p>
              <hr />
              <p className="sub-text">
                A time-tracking, ticket-based, resource management system.
                <br />
                <i>I do not own the code to this project.</i>
              </p>
              <ul>
                <li>DHTMLX</li>
                <li>JS</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div className="box my-miles-bg">
            <div className="caption">
              <p>MyMiles</p>
              <hr />
              <p className="sub-text">
                Record, edit & export vehicle mileage logs in this responsive
                app.
              </p>
              <div className="link-box">
                <a
                  href="https://tranquil-sierra-12911.herokuapp.com/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/myMiles"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>API</li>
                <li>Responsive Design</li>
                <li>JS</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div className="box macro-recipes-bg">
            <div className="caption">
              <p>MacroRecipes</p>
              <hr />
              <p className="sub-text">
                Find Recipes based on ingredients and gram counts of carbs,
                calories, fat, and protein.
              </p>
              <div className="link-box">
                <a
                  href="https://imaginelife.github.io/MacroRecipes/"
                  target="_blank"
                  className="open"
                ></a>
                <a
                  href="https://github.com/imagineLife/MacroRecipes"
                  target="_blank"
                  className="git"
                ></a>
              </div>
              <ul>
                <li>API</li>
                <li>Responsive Design</li>
                <li>CSS</li>
                <li>HTML</li>
                <li>JS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
