import React from "react"
import "./../folio.scss"
import FolioItem from "./../../components/folioItem"
import CertItem from "./../../components/certItem"
import TechList from "./../../components/techList"
import PageHead from "./../../components/PageHead"
import { Link } from "gatsby"

const techs = {
  frontend: [
    "D3",
    "React",
    "Webpack",
    "Wireframing",
    "JS",
    "Responsive Design",
    "Enzyme",
    "Jest",
    "Cypress",
    "Gatsby",
    "NextJS",
  ],
  backend: [
    "Kubernetes (Certified Kubernetes Application Developer)",
    "Node (OpenJS Certified Node Application Developer)",
    "Express",
    "Postman",
    "Swagger",
    "REST API",
    "Socket.io",
    "JWT",
    "Mocha",
    "Chai",
    "Middleware",
    "Server Scaling",
    "Travis-CI",
    "Docker",
    "NextJS",
  ],
  db: [
    "MongoDB (Certified Developer Associate)",
    "PostGreSQL",
    "MySQL",
    "Data Modeling",
  ],
  people: [
    "Certified Professional Scrum Master",
    "Git",
    "GitLab",
    "StrengthFinder Advocate",
    "INTJ",
    "How to manage a remote team (Cert: Gitlab + Coursera)",
  ],
}

const technologies = [
  {
    title: "HTML",
    subText: "Webpage structuring - the core of web content delivery.",
    imgClass: `html-bg`,
  },
  {
    title: "CSS",
    subText: "Styling HTML",
    imgClass: `css-bg`,
  },
  {
    title: "JavaScript",
    subText: "Interacting with the dom && server logic",
    imgClass: `js-bg`,
  },
  {
    title: "D3",
    subText: "Data Driven Documents",
    imgClass: `d3-bg`,
  },
  {
    title: "React",
    subText: "UI Component & State Management",
    imgClass: `react-bg`,
  },
  {
    title: "Storybook",
    subText: "Component Playground",
    imgClass: `storybook-bg`,
  },
  {
    title: "Babel",
    subText: "Transpiling Dev-Friendly code for browsers",
    imgClass: `babel-bg`,
  },
  {
    title: "Webpack",
    subText:
      "Bundling, minifying, chunking, managing code for production optimization",
    imgClass: `webpack-bg`,
  },
  {
    title: "Cypress",
    subText: "End-To-End Testing with JavaScript",
    imgClass: `cypress-bg`,
  },
  {
    title: "Jest",
    subText: "JavaScript Testing",
    imgClass: `jest-bg`,
  },
  {
    title: "Enzyme",
    subText: "React Component Testing",
    imgClass: `enzyme-bg`,
  },
  {
    title: "Analytics",
    subText: "Visualization & Analysis Data",
    imgClass: `dash-bg`,
  },
  {
    title: "Node",
    subText: "Server-Side JavaScript",
    imgClass: `node-bg`,
  },
  {
    title: "Express",
    subText: "Node Server Framework",
    imgClass: `express-bg`,
  },
  {
    title: "MongoDB",
    subText: "Document data storage - consumer-first schemas.",
    imgClass: `mongo-bg`,
  },
  {
    title: "GitLab",
    subText: "All-In-One SaaS Workflow Management & Code Integration",
    imgClass: `gitlab-bg`,
  },
  {
    title: "Docker",
    subText: "Abstracting-Away the OS",
    imgClass: `docker-bg`,
  },
  {
    title: "Kubernetes",
    subText: "Orchestrating Containers",
    imgClass: `k8s-bg`,
  },
  {
    title: "Bash",
    subText: "The Shell",
    imgClass: `bash-bg`,
  },
]
/*
    ADD:
    - docker
    - bash - when i get some bash chops!
    - process automation - github actions + gitlab ci
*/

const certs = [
  {
    title: "Kubernetes Application Develpper",
    subText: "Through Linux Foundation",
    textContext: "cert no. LF-2jtyhllngl",
    // aLink: 'https://university.mongodb.com/certification/certificate/330208369',
    aLink: "https://training.linuxfoundation.org/certification/verify/",
    techList: [
      "Kubernetes",
      "Orchestration",
      "Containers",
      "Networking",
      "Debugging",
    ],
    imgClass: `k8s-cert-bg`,
  },
  {
    title: "MongoDB Certified Developer Associate",
    subText: "Through mongodb university",
    textContext: "cert no. 330208369",
    aLink:
      "https://university.mongodb.com/certified_professional_finder/certified_professionals/793573?name=laursen",
    techList: [
      "Aggregation",
      "CRUD",
      "Data Modeling",
      "Indexes and Performance",
      "Replication",
      "Sharding",
    ],
    imgClass: `mongo-cert-bg`,
  },
  {
    title: "OpenJS Certified Node Application Developer",
    subText:
      "Through the linux foundation, leveraging core node apis for interacting with data streams, os modules, fs handling, process flow, async...",
    textContext: "cert no. LF-0te91c2whv",
    aLink: "https://training.linuxfoundation.org/certification/verify/",
    techList: [
      "Node Core API",
      "Buffers & Streams",
      "Control Flow",
      "Error Handling",
      "Unit Testing",
    ],
    imgClass: `node-cert-bg`,
  },
  {
    title: "Certified Professional Scrum Master",
    subText:
      "Scrum is a framework that teams can use to enable team-wide transparency, inspection & adaptation while developing & delivering complex products.",
    aLink: "https://www.scrum.org/certificates/519854",
    techList: ["Team Process Framework", "Servant Leadership"],
    imgClass: `psmi-bg`,
  },
  {
    title: "How to Manage a Remote Team",
    subText:
      "Best Practices, Managing Remote Team Members, Distributed Team Cultures & Values - all through a partnership between Gitlab and Coursera",
    textContext: "(Certificate)",
    aLink: "https://www.coursera.org/learn/remote-team-management",
    techList: ["Team Process", "Remote", "Management"],
    imgClass: `gitlab-bg`,
  },
]

const folioItems = [
  {
    title: "Slice-n-Dice Times",
    subText:
      "An interactive newspaper-influenced UI, analyzing textual themes in the president's Innaugural Address.",
    aLink: "http://laursen.tech/slice-n-dice-times",
    techList: [
      "D3",
      "Data Vizualization",
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "Data Analysis",
    ],
    imgClass: "slice-n-dice-bg",
  },
  {
    title: "WEO Country Categories Mapped",
    subText:
      "Zoom, toggle, & hover in this map of the countries of the world categorically colored by their GNI per capita.",
    imgClass: "world-map-bg",
    aLink: "/folio/world-map",
    techList: [
      "D3",
      "Mapping",
      "GeoJSON (topJSON)",
      "JavaScript",
      "HTML",
      "CSS",
      "Data Visualization",
    ],
  },
  {
    title: "Mastering D3v5",
    subText:
      "An online course I created covering D3v5, interactive mapping, linked visualizations, 3rd party api integration & more.",
    aLink:
      "https://www.packtpub.com/product/mastering-d3-js-5-video/9781789951332",
    techList: [
      "D3",
      "Data Vizualization",
      "Curriculum Development",
      "Audio/Video Recording & Editing",
    ],
    imgClass: "mastering-bg",
  },
  {
    title: "Restaurant Node API",
    subText:
      "No NPM - No dependencies - just Node: account & cart management (CRUD), a cli, auth, stripe & mailgun api integration, logging & more.",
    imgClass: "pizza-bg",
    aLink: "https://github.com/imagineLife/nodeWork/tree/master/pizzaAPI",
    techList: [
      "Node",
      "JavaScript",
      "Auth",
      "Encryption",
      "Compression + Decompression",
      "cli",
      "logging",
    ],
  },
  {
    title: "SayWhat?!",
    subText:
      "Look at patterns in the text of presidential inaugural addresses in this data-viz focused, full-stack, mobile-first responsive project.",
    imgClass: "say-what-bg",
    aLink: "https://say-what.netlify.com/",
    techList: [
      "D3",
      "React",
      "MongoDB",
      "Express (Node)",
      "Data Visualization",
      "Responsive Design",
      "Text Analysis",
      "HTML",
      "JS",
      "CSS",
    ],
  },
  {
    imgClass: "rhode-island-bg",
    title: "R.I Stats",
    aLink: "https://imaginelife.github.io/ristats/",
    subText:
      "Review Poverty & Income levels in Rhode Island through simple charts & maps.",
    techList: [
      "D3",
      "Mapping",
      "GeoJSON (topJSON",
      "JavaScript",
      "HTML",
      "CSS",
      "Data Visualization",
    ],
  },
  {
    title: "CT Housing Permits, Mapped",
    subText:
      "An interactive choropleth mapping project, representing the range of housing permits issued per town in Connecticut in 2018.",
    aLink: "https://imaginelife.github.io/stateHousingPermits/",
    imgClass: "housing-permits-bg",
    techList: [
      "D3",
      "Mapping",
      "Responsive Design",
      "Data Visualization",
      "JS",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Enterprise Resource Planner",
    subText:
      "A time-tracking, ticket-based, resource management system. I do not own the code to this project.",
    imgClass: "erp-bg",
    techList: ["DHTMLX", "JS", "HTML", "CSS", "PHP"],
  },
  {
    title: "MyMiles",
    imgClass: "my-miles-bg",
    subText:
      "Record, edit & export vehicle mileage logs in this responsive app.",
    aLink: "https://tranquil-sierra-12911.herokuapp.com/",
    techList: ["API", "Responsive Design", "JS", "HTML", "CSS"],
  },
  {
    title: "MacroRecipes",
    subText:
      "Find Recipes based on ingredients and gram counts of carbs, calories, fat, and protein.",
    imgClass: "macro-recipes-bg",
    aLink: "https://imaginelife.github.io/MacroRecipes/",
    techList: ["API", "Responsive Design", "CSS", "HTML", "JS"],
  },
]

export default function Folio() {
  return (
    <main role="main" className="folio">
      <section className="welcome">
        <div className="text-box">
          <b>Welcome</b>
          <section id="snippets">
            <p>Friends & Family call me Jake. </p>
            <p>
              I enjoy building software and services that solve problems,
              particularly in the intersections where data and people meet.
            </p>
          </section>

          <Link to="/">See some of my notes</Link>
          <div className="tech-list-box">
            <TechList listName="Frontend" itms={techs.frontend} />
            <TechList listName="Server" itms={techs.backend} />
            <TechList listName="DataBase" itms={techs.db} />
            <TechList listName="Teams & People" itms={techs.people} />
          </div>
        </div>
      </section>

      <h2>Certifications</h2>
      <section id="certs-wrapper">
        {certs.map((itm, itmIdex) => (
          <CertItem key={`folio-item-${itmIdex}`} {...itm} />
        ))}
      </section>

      <h2>Projects</h2>
      <section id="projects-wrapper">
        {folioItems.map((itm, itmIdex) => (
          <FolioItem key={`folio-item-${itmIdex}`} {...itm} />
        ))}
      </section>

      <h2>Technologies</h2>
      <section id="technologies-wrapper">
        {technologies.map((itm, itmIdex) => (
          <FolioItem key={`folio-item-${itmIdex}`} {...itm} />
        ))}
      </section>
    </main>
  )
}

export function Head() {
  return (
    <PageHead
      {...{
        title: "Eric (Jake) Laursen Portfolio",
        excerpt: "Some examples of webapps, some writing about tech, personality, team development, and more",
        slug: "folio",
        tags: ["portfolio", "about"],
      }}
      />
  )
}
