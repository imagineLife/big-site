import React from 'react';
import sassMods from './folio.module.scss';
import FolioItem from './../../components/folioItem';
import CertItem from './../../components/certItem';
import TechList from './../../components/techList';
import Image from 'next/image';
import FolioCard from '../../components/FolioCard';
import GenericPost from '../../components/GenericPost';
// import { Link } from "gatsby"

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
    'Gatsby',
    'NextJS',
  ],
  backend: [
    'Kubernetes (Certified Kubernetes Application Developer)',
    'Node (OpenJS Certified Node Application Developer)',
    'Express',
    'Postman',
    'Swagger',
    'REST API',
    'Socket.io',
    'JWT',
    'Mocha',
    'Chai',
    'Middleware',
    'Server Scaling',
    'Travis-CI',
    'Docker',
    'NextJS',
  ],
  db: [
    'MongoDB (Certified Developer Associate)',
    'PostGreSQL',
    'MySQL',
    'Data Modeling',
  ],
  people: [
    'Certified Professional Scrum Master',
    'Git',
    'GitLab',
    'StrengthFinder Advocate',
    'INTJ',
    'How to manage a remote team (Cert: Gitlab + Coursera)',
    'Engineering Leadership (Cornell Certificate)',
  ],
};

const techSkills = {
  frontend: [
    {
      title: 'HTML',
      description: 'Webpage structuring - the core of web content delivery.',
      imgClass: `html-bg`,
      img: `html`,
    },
    {
      title: 'CSS',
      description: 'Styling HTML',
      imgClass: `css-bg`,
      img: `css`,
    },
    {
      title: 'JS',
      description: 'Interacting with the dom && server logic',
      imgClass: `js-bg`,
      img: `js`,
    },
    {
      title: 'TypeScript',
      description: 'linting on steroids',
      imgClass: `ts-bg`,
      img: `ts`,
    },
    {
      title: 'D3',
      subText: 'Data Driven Documents',
      imgClass: `d3-bg`,
      img: `d3`,
    },
    {
      title: 'React',
      subText: 'UI Component & State Management',
      imgClass: `react-bg`,
      img: `react`,
    },
    {
      title: 'Storybook',
      subText: 'Component Playground & Documentation',
      imgClass: `storybook-bg`,
      img: `storybook`,
    },
    {
      title: 'Babel',
      subText: 'Transpiling Dev-Friendly code for browsers',
      imgClass: `babel-bg`,
      img: `babel`,
    },
    {
      title: 'Webpack',
      subText:
        'Bundling, minifying, chunking, managing code for production optimization',
      imgClass: `webpack-bg`,
      img: `webpack`,
    },
  ],
  serverSide: [
    {
      title: 'Postman',
      subText: 'API Testing',
      imgClass: `postman-bg`,
      img: `postman`,
    },
    {
      title: 'Node',
      subText: 'Server-Side JS',
      imgClass: `node-bg`,
      img: `node`,
    },
    {
      title: 'Express',
      subText: 'Node Server Framework',
      imgClass: `express-bg`,
      img: `express`,
    },
  ],
  dbs: [
    {
      title: 'MongoDB',
      subText: 'Document data storage - consumer-first schemas.',
      imgClass: `mongo-bg`,
      img: `mongo`,
    },
    {
      title: 'PostGres',
      subText: 'The relational datastore',
      imgClass: `postgres-bg`,
      img: `postgres`,
    },
  ],
  devOps: [
    {
      title: 'Nginx',
      subText: 'Rever Proxying, Load Balancing',
      imgClass: `nginx-bg`,
      img: `nginx`,
    },
    {
      title: 'GitLab',
      subText: 'Repo Hosting, CI/CD Automation Pipelines, Workflow Management',
      imgClass: `gitlab-bg`,
      img: `gitlab`,
    },
    {
      title: 'GitHub',
      subText: 'Repo Hosting, CI/CD Automation Pipelines, Workflow Management',
      imgClass: `gitlab-bg`,
      img: `github`,
    },
    {
      title: 'GitHub Actions',
      subText: 'Automated Workflow Management',
      img: `github-actions`,
    },
    {
      title: 'Docker',
      subText: 'Abstracting-Away the OS',
      imgClass: `docker-bg`,
      img: `docker`,
    },
    {
      title: 'Kubernetes',
      subText: 'Orchestrating Containers',
      imgClass: `k8s-bg`,
      img: `k8s`,
    },
    {
      title: 'Bash',
      subText: 'The Shell',
      imgClass: `bash-bg`,
      img: `bash`,
    },
  ],
  testing: [
    {
      title: 'Cypress',
      subText: 'End-To-End Testing with JS',
      imgClass: `cypress-bg`,
      img: `cypress`,
    },
    {
      title: 'Jest',
      subText: 'JS Testing',
      imgClass: `jest-bg`,
      img: `jest`,
    },
    {
      title: 'Testing Library',
      subText: 'The modern easy-to-use testing library',
      imgClass: `testing-lib-bg`,
      img: `testing-lib`,
    },
    {
      title: 'Enzyme',
      subText: 'React Component Testing',
      imgClass: `enzyme-bg`,
      img: `enzyme`,
    },
    // {
    //   title: 'Mocha',
    //   subText: '',
    //   imgClass: ``,
    //   img: `mocha`,
    // },
    // {
    //   title: 'Chai',
    //   subText: '',
    //   imgClass: ``,
    //   img: `mocha`,
    // },
  ],
  teamWork: [
    {
      title: 'Keynote',
      subText: 'Presenting Ideas alongside Visuals',
      imgClass: `keynote-bg`,
      img: `keynote`,
    },
    // {
    //   title: 'StrengthsFinder',
    //   subText: '',
    //   imgClass: ``,
    //   img: `keynote`,
    // },
    // {
    //   title: 'Scrum',
    //   subText: '',
    //   imgClass: ``,
    //   img: `keynote`,
    // },
  ],
};

const certs = [
  {
    title: 'Engineering Leadership',
    subText:
      'Strengths-Based and Values-Based Approaches, Decision-Making Modes, Collaborative & Courageous Communication, Influence & Motivation',
    aLink:
      'https://ecornell.cornell.edu/certificates/leadership-and-strategic-management/engineering-leadership/',
    techList: [
      'Values',
      'Decision-Making',
      'Communication',
      'Influence Leading',
    ],
    imgClass: `cornell-cert-bg`,
    img: 'cornell_badge.png',
  },
  {
    title: 'Kubernetes Application Developer',
    subText:
      'Defining Container resources, pods, deployments, CronJobs, Deployment strategies, kubectl, logging, authn, athz, configmaps, serviceAccounts, netowrking policies...',
    textContext: 'cert no. LF-2jtyhllngl',
    // aLink: 'https://university.mongodb.com/certification/certificate/330208369',
    aLink: 'https://training.linuxfoundation.org/certification/verify/',
    techList: [
      'Kubernetes',
      'Orchestration',
      'Containers',
      'Networking',
      'Debugging',
    ],
    imgClass: `k8s-cert-bg`,
    img: 'k8s_cert_badge.png',
  },
  {
    title: 'MongoDB Certified Developer Associate',
    subText: 'Through mongodb university',
    textContext: 'cert no. 330208369',
    aLink:
      'https://university.mongodb.com/certified_professional_finder/certified_professionals/793573?name=laursen',
    techList: [
      'Aggregation',
      'CRUD',
      'Data Modeling',
      'Indexes and Performance',
      'Replication',
      'Sharding',
    ],
    imgClass: `mongo-cert-bg`,
    img: 'mongo-cred.png',
  },
  {
    title: 'OpenJS Certified Node Application Developer',
    subText:
      'Through the linux foundation, leveraging core node apis for interacting with data streams, os modules, fs handling, process flow, async...',
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
    img: 'node-cert.png',
  },
  {
    title: 'Certified Professional Scrum Master',
    subText:
      'Scrum is a framework that teams can use to enable team-wide transparency, inspection & adaptation while developing & delivering complex products.',
    aLink: 'https://www.scrum.org/certificates/519854',
    techList: ['Team Process Framework', 'Servant Leadership'],
    imgClass: `psmi-bg`,
    img: 'psmiBadge.png',
  },
  {
    title: 'How to Manage a Remote Team',
    subText:
      'Best Practices, Managing Remote Team Members, Distributed Team Cultures & Values - through Gitlab/Coursera',
    aLink: 'https://www.coursera.org/learn/remote-team-management',
    techList: ['Team Process', 'Remote', 'Management'],
    imgClass: `gitlab-bg`,
    img: 'gitlab.jpg',
  },
];

const folioItems = [
  {
    title: 'Slice-n-Dice Times',
    description:
      "An interactive newspaper-influenced UI, analyzing textual themes in the former president's Innaugural Address.",
    aLink: 'http://laursen.tech/folio/slice-n-dice-times',
    techList: [
      'D3',
      'Data Vizualization',
      'React',
      'HTML',
      'CSS',
      'JS',
      'Data Analysis',
    ],
    imgClass: 'slice-n-dice-bg',
    img: 'slice.gif',
  },
  {
    title: 'WEO Country Categories Mapped',
    description:
      'Zoom, toggle, & hover in this map of the countries of the world categorically colored by their GNI per capita.',
    img: 'worldmap.gif',
    aLink: '/folio/world-map',
    techList: [
      'D3',
      'Mapping',
      'GeoJSON (topJSON)',
      'JS',
      'HTML',
      'CSS',
      'Data Visualization',
    ],
  },
  {
    title: 'Mastering D3v5',
    description:
      'An online course I created covering D3v5, interactive mapping, linked visualizations, 3rd party api integration & more.',
    aLink:
      'https://www.packtpub.com/product/mastering-d3-js-5-video/9781789951332',
    techList: [
      'D3',
      'Data Vizualization',
      'Curriculum Development',
      'Audio/Video Recording & Editing',
    ],
    img: 'd3Course.gif',
  },
  {
    title: 'Restaurant Node API',
    description:
      'No NPM - No dependencies - just Node: account & cart management (CRUD), a cli, auth, stripe & mailgun api integration, logging & more.',
    img: 'nodeServer.jpg',
    aLink: 'https://github.com/imagineLife/nodeWork/tree/master/pizzaAPI',
    techList: [
      'Node',
      'JS',
      'Auth',
      'Encryption',
      'Compression + Decompression',
      'cli',
      'logging',
    ],
  },
  {
    img: 'ristats/1.jpg',
    title: 'R.I Stats',
    aLink: 'https://imaginelife.github.io/ristats/',
    description:
      'Review Poverty & Income levels in Rhode Island through simple charts & maps.',
    techList: [
      'D3',
      'Mapping',
      'GeoJSON (topJSON',
      'JS',
      'HTML',
      'CSS',
      'Data Visualization',
    ],
  },
  {
    title: 'CT Housing Permits, Mapped',
    description:
      'An interactive choropleth mapping project, representing the range of housing permits issued per town in Connecticut in 2018.',
    aLink: 'https://imaginelife.github.io/stateHousingPermits/',
    img: 'cttowns.gif',
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
    description:
      'A time-tracking, ticket-based, resource management system. I do not own the code to this project.',
    img: 'erp/1.jpg',
    techList: ['DHTMLX', 'JS', 'HTML', 'CSS', 'PHP'],
  },
];

function MyHeader({ text }) {
  return (
    <div className="flex-1 basis-full">
      <h2>{text}</h2>
    </div>
  );
}

export default function Folio() {
  return (
    // className={`${sassMods.folio} flex flex-col prose`}

    /*
let {
    title,
    name,
    excerpt,
    slug,
    tags,
    description,
    source,
    prevPost,
    nextPost,
    globalData,
    slugArr,
    children,
  } = props;
   */
    <GenericPost
      {...{
        title: 'Developer portfolio',
        name: 'folio',
        globalData: { name: 'folio' },
        excerpt: 'a handful of side-projects',
        slug: '/folio',
        tags: ['projects', 'portfolio'],
        slugArr: ['folio'],
      }}
    >
      {/* <main role="main" className="flex flex-col max-w-[90%] mx-auto"> */}
      <section className="welcome flex flex-col">
        <div className="text-box">
          <h1>Welcome</h1>
          <section id="snippets">
            <p>Friends & Family call me Jake. </p>
            <p>
              I enjoy building software and services that solve problems,
              particularly in the intersections where data and people meet.
            </p>
          </section>

          {/* <Link to="/">See some of my notes</Link> */}
          {/* sassMods['tech-list-box'] */}
          {/* REMOVE?@ */}
          {/* <div className="flex">
              <TechList listName="Frontend" itms={techs.frontend} />
              <TechList listName="Server" itms={techs.backend} />
              <TechList listName="DataBase" itms={techs.db} />
              <TechList listName="Teams & People" itms={techs.people} />
            </div> */}
        </div>
      </section>

      <section
        id="certs-wrapper"
        // className="@container flex flex-wrap gap-2 flex-col"
        // mx-auto
        className="px-4"
      >
        <MyHeader text="A Brief Portfolio" />
        {/* <section className="grid grid-cols-1"> */}
        {/* <div class="container mx-auto px-4"> */}
        <div
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          id="folio-items-wrapper"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
        >
          {folioItems.map((itm) => (
            // <FolioBox key={`folio-item-${itm.title}`} {...itm} />
            <FolioCard key={`folio-item-${itm.title}`} {...itm} />
          ))}
        </div>
        {/* </section> */}
      </section>

      <section id="technologies-wrapper" className="@container flex flex-col">
        <MyHeader text="Tech" />
        {/* {technologies.map((itm, itmIdex) => (
            <FolioItem key={`folio-item-${itmIdex}`} {...itm} />
          ))} */}
        <section className="flex flex-wrap">
          {/* flex: 0 0 100%; /* flex-grow, flex-shrink, flex-basis */}
          <h3 className="flex-grow-0 flex-shrink-0 basis-full m-0">Frontend</h3>
          {techSkills.frontend.map((itm, itmIdex) => (
            <FolioItem key={`frontend-tech-${itmIdex}`} {...itm} size={75} />
          ))}

          <h3 className="flex-grow-0 flex-shrink-0 basis-full m-0">
            Server-Side
          </h3>
          {techSkills.serverSide.map((itm, itmIdex) => (
            <FolioItem key={`server-side-tech-${itmIdex}`} {...itm} size={75} />
          ))}

          <h3 className="flex-grow-0 flex-shrink-0 basis-full m-0">Database</h3>
          {techSkills.dbs.map((itm, itmIdex) => (
            <FolioItem key={`data-tech-${itmIdex}`} {...itm} size={75} />
          ))}

          <h3 className="flex-grow-0 flex-shrink-0 basis-full m-0">DevOps</h3>
          {techSkills.devOps.map((itm, itmIdex) => (
            <FolioItem key={`data-tech-${itmIdex}`} {...itm} size={75} />
          ))}

          <h3 className="flex-grow-0 flex-shrink-0 basis-full m-0">Testing</h3>
          {techSkills.testing.map((itm, itmIdex) => (
            <FolioItem key={`data-tech-${itmIdex}`} {...itm} size={75} />
          ))}
        </section>
      </section>

      {/* <section id="projects-wrapper">
          <div className="frosted-bg">
            <h2>Projects</h2>
          </div>
          {folioItems.map((itm, itmIdex) => (
            <FolioItem key={`folio-item-${itmIdex}`} {...itm} />
          ))}
        </section> */}
      {/* </main> */}
    </GenericPost>
  );
}
