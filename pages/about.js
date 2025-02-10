import React, { Fragment, useState } from 'react';
import Link from 'next/link';
// import './index.scss';
// Components

import { useRouter } from 'next/router';
import GenericPost from './../components/GenericPost';
// import learnerImg from '/public/about/learn.jpg';
// import doerImg from '/public/about/work.jpg';
// import coffeeImg from '/public/about/coffee.jpg';
// import introvertImg from '/public/about/introvert.jpg';
// import strengthsImg from '/public/about/strengths.jpg';
import LinkedIn from '/public/about/linkedin.js';
import Github from '/public/about/github.js';

const aboutContactLinks = [
  {
    to: 'https://www.linkedin.com/in/eric-laursen-6a1b20b8/',
    MyImage: LinkedIn,
    title: 'linkedIn profile',
  },
  {
    to: 'https://github.com/imagineLife',
    title: 'github code repository',
    MyImage: Github,
  },
];

function About() {
  const router = useRouter();
  return (
    <GenericPost
      {...{
        title: 'About Me',
        name: 'about',
        slug: '/about',
        tags: ['bio', 'blog', 'biography', 'about', 'about me'],
        slugArr: ['about'],
      }}
    >
      <div className="md-wrapper alternating">
        {/*  */}
        {/* About Me Tl'DR */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2>TL;DR</h2>
            <p>
              I&apos;m a <a href="#a-doer">do-er</a>. I&apos;m a{' '}
              <a href="#a-learner">learner</a>. I&apos;m a{' '}
              <a href="#sf">CliftonStrengths Advocate</a>. Meyers Briggs says I
              prefer to be an <a href="#mb">INJT</a>. I&apos;m also a bit of a{' '}
              <a href="#coffee">coffee fanatic</a>.
              <br />
              I&apos;m also on{' '}
              <a
                href="https://www.linkedin.com/in/eric-laursen-6a1b20b8/"
                target="_blank"
              >
                LinkedIn
              </a>{' '}
              and{' '}
              <a href="https://github.com/imagineLife" target="_blank">
                github
              </a>
              .
            </p>
          </div>
        </section>

        {/*  */}
        {/* A Do-er */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2 id="a-doer">A Do-er</h2>
            <p>
              I am usually a little restless if I&apos;m not getting something
              done: roasting coffee, learning something new, trying a new
              recipe... meditating, reading...
            </p>
          </div>
          <div className="figure">
            {/* <img src={doerImg} alt="do-er" /> */}
          </div>
        </section>

        {/*  */}
        {/* A Learner */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2 id="a-learner">A Learner</h2>
            <p>
              I feel like I love the journey of traversing from casual interest
              to mastery. I find it exciting to learn a brand new thing as well
              as diving in to nuanced details of well-trodded territory.
            </p>
            <p>
              My <Link href="/">blog</Link> has links to some writings on topics
              I&apos;ve found interesting: <Link href="/node">node</Link>,{' '}
              <Link href="/mongo">mongodb</Link>,{' '}
              <Link href="/scrum">scrum</Link>,{' '}
              <Link href="/k8s">kubernetes</Link>,
              <Link href="/the-social-world">life in general</Link>,...
            </p>
            <p>
              Lately I&apos;ve been dabbling with some{' '}
              <Link href="/ai-ml">
                python for data-science & Machine-Learning
              </Link>
            </p>
            .
          </div>
          <div className="figure">
            {/* <Image src={learnerImg} alt="learner" /> */}
          </div>
        </section>

        {/*  */}
        {/* StrengthsFinder */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2 id="sf">A CliftonStrengths Advocate</h2>
            <p>
              I&apos;ve been enjoying the principles of a strengths-first way of
              being, both in my own life and when working with others. When
              conflict arises, we can learn to leverage one anothers&apos;
              personality tendencies for the best, and take steps toward
              conflict resolution by pulling out the best in one another. (
              <i>quotes below from gallups site</i>)
            </p>
            <ul>
              <li>
                {' '}
                <a
                  href="https://www.gallup.com/cliftonstrengths/en/252293/learner-theme.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Learner</b>
                </a>{' '}
                ...a great desire to learn and want to continuously improve. The
                process of learning, rather than the outcome... is exciting to
                me!
              </li>
              <li>
                {' '}
                <a
                  href="https://www.gallup.com/cliftonstrengths/en/252278/input-theme.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Input</b>
                </a>{' '}
                ...have a need to collect and archive... information, ideas,
                artifacts...
              </li>
              <li>
                {' '}
                <a
                  href="https://www.gallup.com/cliftonstrengths/en/252215/deliberative-theme.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Deliberative</b>
                </a>{' '}
                ...described by the serious care (I) take in making decisions or
                choices. (I) anticipate obstacles.
              </li>
              <li>
                {' '}
                <a
                  href="https://www.gallup.com/cliftonstrengths/en/252176/command-theme.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Command</b>
                </a>{' '}
                ...have presence. (I) can take control of a situation and make
                decisions.
              </li>
              <li>
                {' '}
                <a
                  href="https://www.gallup.com/cliftonstrengths/en/252134/achiever-theme.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Achiever</b>
                </a>{' '}
                ...work hard to possess a great deal of stamina... take immense
                satisfactioin in being busy and productive.
              </li>
            </ul>
          </div>
          <div className="figure">
            {/* <img src={strengthsImg} alt="StrengthsFinder advocate" /> */}
          </div>
        </section>

        {/*  */}
        {/* INTJ */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2 id="mb">An INTJ</h2>
            <p>
              Per{' '}
              <a
                href="https://www.myersbriggs.org/my-mbti-personality-type/mbti-basics/"
                target="_blank"
                rel="noreferrer"
              >
                The MeyersBriggs
              </a>{' '}
              personality assessment, I&apos;m an INTJ.
            </p>
            <p>
              Check out the{' '}
              <a
                href="https://www.16personalities.com/"
                target="_blank"
                rel="noreferrer"
              >
                16 personalities site
              </a>{' '}
              for a more friendly breakdown of the assessment.
            </p>
            <p>
              <b>Solitude is Exciting</b> - Introversion over Extroversion
            </p>
            <p>
              <b>The Past & The Future more than the present</b> - Intuition
              over Sensing
            </p>
            <p>
              <b>How more than Who</b> - Thinking over Feeling
            </p>
            <p>
              <b>Planning Over Spontaneity</b> - Judging over Perceiving
            </p>
          </div>
          <div className="figure">
            {/* <img src={introvertImg} alt="introvert" /> */}
          </div>
        </section>

        {/*  */}
        {/* Coffee */}
        {/*  */}
        <section className="box">
          <div className="text">
            <h2 id="coffee">A Coffee Fanatic</h2>
            <p>
              I love my morning ritual of grinding & brewing coffee. I love
              finding raw beans a roasting them, playing around with nuances of
              the roast and of the brew.
            </p>
            <h3>Raw Beans</h3>
            <p>
              I&apos;m on an anaerobic, long fermentation, & co-fermented kick,
              on the lookout for beans by growers & farms that I know the names
              of: the arcila family, wilton benitez, edwin norena, the lassos,
              julio madrid, elkin guzman, and a few other recommendations.{' '}
            </p>
            <h3>Roasting</h3>
            <p>
              I roast on a FreshRoast SR700 & an extended chamber. I&apos;ve
              recently been &quot;resting&quot; the coffee for 10-15 days before
              drinking.{' '}
            </p>
            <h3>Grinding & Brewing</h3>
            <p>
              I grind with a{' '}
              <a
                href="https://fellowproducts.com/products/ode-brew-grinder-gen-2"
                target="blank"
              >
                Fellow Ode Gen2
              </a>
              . I brew with a V60 01 (1-cup) porcelain brewer into a v60 1-cup
              carafe (just got the carafe, love the thing!).
            </p>
          </div>
          <div className="figure">
            {/* <img src={coffeeImg} alt="coffee fanatic" /> */}
          </div>
        </section>

        {/* <section className="box">
          <div className="text">
            <h4>Links</h4>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            > */}

        {aboutContactLinks.map((d) => {
          return (
            // target="_blank"
            // <Link to={d.to} key={d.to}>
            //   water
            <div
              key={d.to}
              onClick={() => router.push(d.to)}
              className="cursor-pointer"
              title={d.title}
            >
              <d.MyImage />
            </div>
          );
        })}
        {/* ))} */}
        {/* </div>
          </div>
        </section> */}
      </div>
    </GenericPost>
  );
}
export default About;

// export function Head() {
//   return (
//     <Fragment>
//       <title>About Me</title>
//       <meta
//         name="description"
//         content="I&apos;m a do-er, a learner, and I enjoy working with people, data, and tech!"
//       />
//       <meta property="og:title" content="Eric Laursen" />
//       <meta property="og:url" content="http://laursen.tech" />
//       <meta httpEquiv="cache-control" content="no-cache" />
//       <meta httpEquiv="expires" content="0" />
//       <meta httpEquiv="pragma" content="no-cache" />
//       <script type="application/ld+json">
//         {JSON.stringify({
//           '@context': 'https://schema.org',
//           '@type': 'BlogPosting',
//           name: 'About Eric (Jake) Laursen',
//           author: {
//             '@type': 'Person',
//             name: 'Eric Laursen (Jake)',
//             url: 'http://laursen.tech/about/',
//           },
//           description:
//             "I&apos;m a, a learner, a do-er, and I enjoy working with people, data, and tech",
//           headline: 'About Eric (Jake) Laursen',
//           keywords: [
//             'blog',
//             'blog post',
//             'blogpost',
//             'software',
//             'software engineer',
//             'react',
//             'node',
//             'software developer',
//           ],
//           inLanguage: 'en-US',
//         })}
//       </script>
//     </Fragment>
//   );
// }
