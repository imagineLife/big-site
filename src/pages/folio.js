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
            <ul className="tech-list">
              <li className="tech-li title">
                <b>Frontend</b>
              </li>
              <br />
              {techs.frontend.map((t, tIdx) => (
                <Fragment>
                  <li key={`frontend-tech-${tIdx}`} className="tech-li">
                    {t}
                  </li>
                  {tIdx !== techs.frontend.length < 1 && ' '}
                </Fragment>
              ))}
            </ul>
            <ul className="tech-list">
              <li className="tech-li title">
                <b>Server</b>
              </li>
              <br />
              {techs.backend.map((t, tIdx) => (
                <Fragment>
                  <li key={`backend-tech-${tIdx}`} className="tech-li">
                    {t}
                  </li>
                  {tIdx !== techs.backend.length < 1 && ' '}
                </Fragment>
              ))}
              <br />
            </ul>
            <ul className="tech-list">
              <li className="tech-li title">
                <b>DataBase</b>
              </li>
              <br />
              {techs.db.map((t, tIdx) => (
                <Fragment>
                  <li key={`db-tech-${tIdx}`} className="tech-li">
                    {t}
                  </li>
                  {tIdx !== techs.db.length < 1 && ' '}
                </Fragment>
              ))}
            </ul>
            <ul className="tech-list">
              <li className="tech-li title">
                <b>Team & People</b>
              </li>
              <br />
              {techs.people.map((t, tIdx) => (
                <Fragment>
                  <li key={`db-people-${tIdx}`} className="tech-li">
                    {t}
                  </li>
                  {tIdx !== techs.people.length < 1 && ' '}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects-wrapper">
        <div className="col-3-4 hover-v2">
          <div target="_blank" className="box node-cert-bg">
            <div className="caption">
              <p>
                OpenJS Node Application Developer <i>(Certified)</i>
              </p>
              <hr />
              <p className="sub-text">
                Through the linux foundation, certified in leveraging core node
                apis for interacting with data streams, os modules, filesystems,
                and more.
                <br />
                <sup>
                  <i>cert no. LF-0te91c2whv</i>
                </sup>
              </p>
              <a
                href="https://training.linuxfoundation.org/certification/verify/"
                target="_blank"
                className="open"
              ></a>
              <ul>
                <li>Node Core API</li>
                <li>Buffers & Streams</li>
                <li>Control Flow</li>
                <li>Error Handling</li>
                <li>Unit Testing</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div target="_blank" className="box psmi-bg">
            <div className="caption">
              <p>
                Professional Scrum Master <i>(Certified)</i>
              </p>
              <hr />
              <p className="sub-text">
                Scrum is a framework that teams can use to enable team-wide
                transparency, inspection & adaptation while developing &
                delivering complex products.
              </p>
              <a
                href="https://www.scrum.org/certificates/519854"
                target="_blank"
                className="open"
              ></a>
              <ul>
                <li>Team Process Framework</li>
                <li>Servant Leadership</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div target="_blank" className="box slice-n-dice-bg">
            <div className="caption">
              <p>Slice-'n-Dice Times</p>
              <hr />
              <p className="sub-text">
                An interactive newspaper-influenced UI, analyzing textual themes
                in the president's Innaugural Address.
              </p>
              <a
                href="https://slice-n-dice-times.herokuapp.com/"
                target="_blank"
                className="open"
              ></a>
              <ul>
                <li>D3</li>
                <li>Data Vizualization</li>
                <li>React</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Data Analysis</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div target="_blank" className="box mastering-bg">
            <div className="caption">
              <p>Mastering D3v5</p>
              <hr />
              <p className="sub-text">
                An online course I created covering D3v5, interactive mapping,
                linked visualizations, 3rd party api integration & more.
              </p>
              <a
                href="https://www.packtpub.com/product/mastering-d3-js-5-video/9781789951332"
                target="_blank"
                className="open"
              ></a>
              <ul>
                <li>D3</li>
                <li>Data Vizualization</li>
                <li>Curriculum Development</li>
                <li>Audio/Video Recording & Editing</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-3-4 hover-v2">
          <div
            className="box pizza-bg"
            href="https://github.com/imagineLife/nodeWork/tree/master/pizzaAPI"
            target="_blank"
          >
            <div className="caption">
              <p>Restaurant Node API</p>
              <hr />
              <p className="sub-text">
                An API using core Node API, no npm: account & cart management
                <i>(CRUD)</i>, a cli, auth,
                <i>stripe & mailgun api</i> integration, logging & more.
              </p>
              <a
                href="https://github.com/imagineLife/nodeWork/tree/master/pizzaAPI"
                target="_blank"
                className="git"
              ></a>
              <ul>
                <li>Node</li>
                <li>JavaScript</li>
                <li>Auth</li>
                <li>Encryption</li>
                <li>Compression + Decompression</li>
                <li>cli</li>
                <li>logging</li>
              </ul>
            </div>
          </div>
        </div>
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
