import React from 'react';
import GenericPost from './../components/GenericPost';
import TagList from './../components/TagList';
import Link from 'next/link';
import Image from 'next/image';
function WorkTitle({ title, date, logo, width }) {
  return (
    <div className="flex flex-row gap-5 align-middle">
      {logo && typeof logo !== 'string' && (
        <span className="mr-[5px] self-center !mt-[20px]">LOGO!!</span>
      )}
      {logo && typeof logo == 'string' && (
        <Image
          alt={`${title}-image`}
          src={logo}
          width={width || 30}
          height={30}
          objectFit="contain"
          className="max-h-[30px]"
        />
      )}
      <h2 className="w-fit !mt-[25px]" id={title}>
        {title}
      </h2>
      <p className="italic self-center right-0 !mb-0 ml-auto">{date}</p>
    </div>
  );
}

function Alteryx() {
  return (
    <>
      <WorkTitle
        title="Alteryx: Analytics Cloud"
        date="Mar 2022 - now"
        logo="/about/alteryx.png"
      />
      <h3>Workspace Management</h3>
      <p>
        Leading the enablement of an enterprise-ready self-service RBAC{' '}
        {/* <Link
          target="_blank"
          href="https://help.alteryx.com/aac/en/platform/admin/admin-reference/account-management/workspace-management.html#workspace-management"
        > */}
        workspace configuration feature-set
        {/* </Link>{' '} */} via UI & API: workspace management, workspace-admin
        management, & workspace-user management.
      </p>
      <details className="mt-[20px]">
        <summary className="text-[18px]">
          <b>Live Workspace Management Docs</b>
        </summary>
        <iframe
          width="500"
          height="800"
          src="https://help.alteryx.com/aac/en/platform/admin/admin-reference/account-management/workspace-management.html#workspace-management"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </details>
      <h3>Authentication Micro-Frontend</h3>
      <p>
        Spearheaded a monolith-to-microfrontend transition of several
        authentication-based UIs & APIs:{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/sign-in?"
        >
          sign-in
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/forgot"
        >
          forgot&reset password
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://us1.alteryxcloud.com/auth-portal/register"
        >
          register
        </Link>
        , and <i>auth protected</i> workspace-picker, & OTP confirmation.
      </p>
      <sub className="italic">
        Work Style: remote, highly collaborative across domains & time-zones,
        on-call rotations, regularly interacting with a dozen-ish folks of a
        &quot;large&quot; org.
      </sub>
      <TagList
        inline
        hideTitle
        tags={[
          'typescript',
          'react',
          'node',
          'express',
          'sequelize',
          'mysql',
          'postgres',
          'CRUD APIs',
          'umzug (db migrations)',
          'Figma',
          'Design System',
          'Component Library',
          'cross-functional collaboration',
          'docker',
          'kubernetes',
          'kafka',
          'confluent',
          'gitlab',
          'webpack',
          'rspack',
          'rsbuild',
          'jest',
          'mocha',
          'chai',
          'testing-library',
          'datadog',
          'teleport',
          'black duck',
          'report portal',
          'pager duty',
          'OIDC',
          'IDP-Broker research',
          'JWT',
          'jira',
          'slack',
          'teams',
        ]}
      />
    </>
  );
}

function Medacist() {
  return (
    <>
      <WorkTitle
        logo="/about/medacist.jpeg"
        title="Medacist Solutions Group (Bluesight)"
        date="Jun 2019 - Mar 2022"
      />
      <h3>RxAuditor Investigate</h3>
      <iframe
        width="720"
        height="309"
        src="https://www.youtube.com/embed/6yvndHINfsI"
        title="what&#39;s new with medacist? | RxAuditor Investigate"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p>
        From the &quot;Ground-up&quot; flagship product development for
        drug-diversion analytics: designing & building several interactive
        data-driven UIs (dashboards, chat, & forms). Custom domain-specific
        visualizations, hierarchical role-based access control, auth, and
        application access-management tooling.
      </p>
      <sub className="italic">
        Work Style: in-person & hybrid, highly collaborative across domains &
        time-zones, regularly interacting with less-than-10 folks of a small
        org.
      </sub>
      <TagList
        inline
        hideTitle
        tags={[
          'CRUD APIs',
          'react',
          'node',
          'express',
          'sql',
          'flyway',
          'flow (ts alternate of the time)',
          'Figma',
          'cross-functional collaboration',
          'docker',
          'gitlab',
          'webpack',
          'D3',
          'hiring',
          'role development',
          'engineering-ladder framework creation',
          'jest',
          'mocha',
          'chai',
          'JWT',
          'mattermost',
        ]}
      />
    </>
  );
}

function CompuWeigh() {
  return (
    <>
      <WorkTitle
        title="CompuWeigh"
        date="May 2018 - May 2019"
        logo="/about/compuweigh.jpg"
        width="150"
      />
      <h3>SmartTruck Lite</h3>
      <Image
        alt="compuweigh"
        src="https://s3-us-west-2.amazonaws.com/grainnet-com/uploads/Company-Profiles/SmartTruck-Lite-Printer_Updated-Screen_Guard_CW.jpg"
        width="200"
        height="30"
      />
      <p>
        {/* TODO: 
        - modal?? what word!? 
        - tortoise VM?!
        - link urls
        */}
        UI of a modal{' '}
        <Link
          href="https://www.grainfeedequipment.com/profiles/compuweigh"
          target="_blank"
          className="underline"
        >
          RFID Truck Processing Terminal
        </Link>{' '}
        for truck-drivers to interact throughout processing facilities.
      </p>
      <sub className="italic">
        Work Style: in-person, independent, regularly interacting with
        less-than-10 folks of a small org.
      </sub>
      <TagList
        inline
        hideTitle
        tags={['angularjs', 'tortoise SVM', 'webpack', 'D3']}
      />
    </>
  );
}

function Infinigence() {
  return (
    <>
      <WorkTitle title="Infinigence" date="Jan 2015 - Dec 2016" />
      <h3>Ticket-Based Management (internal tooling)</h3>
      <p>
        A from the &quot;Ground-up&quot; ticket-based management system for
        internal team members of a small locally-serving IT-support company:
        CRUD tickets, assign & manage ticket owners, prioritize, time-tracking,
        & an analytics dashboard.
      </p>
      <sub className="italic">
        Work Style: in-person, highly-collaborative, regularly interacting with
        less-than-10 folks of a small org.
      </sub>
      <TagList
        inline
        hideTitle
        tags={['javascript', 'html', 'sql', 'php', 'dhtmlx']}
      />
    </>
  );
}

function ThisSite() {
  return (
    <>
      <WorkTitle title="This Blog" />
      <p>Notes & thoughts along the way of my learning.</p>
      <TagList
        hideTitle
        tags={[
          'javascript',
          'html',
          'react',
          'nextjs',
          'gatsbyjs',
          'graphql',
          'node',
          'markdown',
          'python',
          'jupyter notebooks',
          'ai',
          'machine learning',
          'data science',
          'tensorflow',
          'mongoDB',
          'github',
          'render (apis)',
          'netlify',
          'google analytics',
        ]}
      />
    </>
  );
}

const certs = [
  {
    title:
      'Artificial Intelligence and Machine Learning: Business Applications',
    subText: 'A Post Graduate Program (w.i.p)',
    aLink:
      'https://onlineexeced.mccombs.utexas.edu/uta-artificial-intelligence-machine-learning',
    techList: [
      'Python',
      'Google Colab',
      'Tensorflow',
      'Machine Learning',
      'Artificial Intelligence',
      'Regression Analysis',
      'K-Means Clustering',
      'Natural Language Processing (NLP)',
      'Neural Networks',
      'Retrieval Augmented Generation (RAG)',
      'Computer Vision',
    ],
    img: `UTAustin.png`,
    width: 350,
  },
  {
    title: 'Engineering Leadership',
    subText:
      'Strengths-Based and Values-Based Approaches, Decision-Making Modes, Collaborative & Courageous Communication, Influence & Motivation, via eCornell',
    aLink:
      'https://ecornell.cornell.edu/certificates/leadership-and-strategic-management/engineering-leadership/',
    techList: [
      'Values',
      'Decision-Making',
      'Communication',
      'Influence Leading',
    ],
    img: `cornell_badge.png`,
  },
  {
    title: 'Kubernetes Application Developer',
    subText: 'Through Linux Foundation',
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
    img: `k8s_cert_badge.png`,
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
    img: `mongo-cred.png`,
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
    img: `node-cert.png`,
  },
  {
    title: 'Certified Professional Scrum Master',
    subText:
      'Scrum is a framework that teams can use to enable team-wide transparency, inspection & adaptation while developing & delivering complex products.',
    aLink: 'https://www.scrum.org/certificates/519854',
    techList: [
      'Team Process Framework',
      'Servant Leadership',
      'Iteration',
      'Inspection',
      'Transparency',
    ],
    img: `psmi.png`,
  },
  {
    title: 'How to Manage a Remote Team',
    subText:
      'Best Practices, Managing Remote Team Members, Distributed Team Cultures & Values - all through a partnership between Gitlab and Coursera',
    // textContext: '(Certificate)',
    aLink: 'https://www.coursera.org/learn/remote-team-management',
    techList: ['Team Process', 'Remote', 'Management'],
    img: `gitlab.jpg`,
  },
];

function CertItem({
  aLink,
  subText,
  title,
  textContext,
  img,
  width,
  techList,
}) {
  return (
    <section className="certs-wrapper">
      <h3>{title}</h3>
      <section className="flex gap-5">
        <Image
          alt={`${title}-image`}
          src={`/certs/${img}`}
          width={width || 60}
          height={60}
          objectFit="contain"
          className="max-h-[60px]"
        />
        <section className="cert-description w-fit">
          <p className="!p-0 !m-0">{subText}</p>
          {textContext && (
            <sup>
              <i>{textContext}</i>
            </sup>
          )}

          {techList && (
            <>
              <br />
              {techList.map((t, tidx) => {
                const text = tidx !== techList.length - 1 ? `${t} | ` : t;
                return (
                  <span
                    key={`tech-list-${title}-${t}`}
                    className="text-gray-700 dark:text-white dark:opacity-60 text-md"
                  >
                    {text}
                  </span>
                );
              })}
            </>
          )}
        </section>
      </section>
      {aLink && <Link href={aLink} target="_blank" rel="noreferrer" />}
    </section>
  );
}

export default function WorkPage() {
  return (
    <GenericPost
      {...{
        title: 'Work Experience',
        globalData: {
          name: 'Eric Laursen CV, Experience, and Certifications',
        },
        slug: '/work',
        tags: [
          'bio',
          'experience',
          'cv',
          'angularjs',
          'tortoise SVM',
          'webpack',
          'D3',
          'CRUD APIs',
          'react',
          'node',
          'express',
          'sequelize',
          // todo: is this the right name?
          'umzug',
          'typescript',
          'Figma',
          'cross-functional collaboration',
          'docker',
          'kubernetes',
          'gitlab',
          'rspack',
          'rsbuild',
          'jest',
          'mocha',
          'chai',
          'testing-library',
          'datadog',
          'teleport',
          'pager duty',
          'OIDC',
          'IDP-Broker research',
          'JWT',
          'jira',
        ],
        slugArr: ['work'],
      }}
    >
      <Alteryx />
      <div className="m-32" />
      <Medacist />
      <div className="m-32" />
      <CompuWeigh />
      <div className="m-32" />
      <Infinigence />
      <div className="m-32" />
      <ThisSite />
      <div className="m-32" />
      <h1
        className="text-3xl md:text-5xl dark:text-white text-center mb-12 font-normal"
        id="certifications"
      >
        Certifications
      </h1>
      {certs.map((itm, itmIdex) => (
        <CertItem key={`folio-item-${itmIdex}`} {...itm} />
      ))}
    </GenericPost>
  );
}
