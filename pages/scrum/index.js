import React, { Fragment } from 'react';
import { getMdPostSummaries, getGlobalData } from '../../utils';
import Layout from './../../components/Layout';
import Link from 'next/link';
import PostLink from '../../components/PostLink';

const ScrumIndex = ({ posts }) => {
  return (
    <Fragment>
      {/* <Hero /> */}
      <Layout>
        <section className="toc-wrapper">
          <h1>Scrum</h1>
          <section id="notes">
            <p>
              While studying for and becoming a Certified{' '}
              <Link
                target="_blank"
                href="https://www.scrum.org/certificates/519854"
              >
                Professional Scrum Master
              </Link>{' '}
              through scrum.org, I did a bit of writing - here&apos;s some
              notes!
            </p>
          </section>
          <br />
          <p>TLDR</p>
          <p>Scrum is a &quot;framework&quot; with a few parts</p>
          <ul>
            <li>
              <b>Theories & Values:</b> The &quot;why&quot;
            </li>
            <li>
              <b>A Team Description:</b> 3 Roles
            </li>
            <li>
              <b>Events:</b> Things that happen (<i>a few hours per week</i>)
            </li>
            <li>
              <b>Artifacts:</b> 4 tangible objects
            </li>
          </ul>
          <p>
            Scrum is intended to help teams and organizations create value
            incrementally in a complex environment.
          </p>
          <br />
          <p>
            I personally don&apost feel like I have enough experience with other
            &quot;frameworks&quot; to really support how the{' '}
            <a href="https://scrumguides.org/scrum-guide.html">scrum guide</a>{' '}
            refers to scrum as a &quot;lightweight&quot; framework. I know that
            there are a few concrete details with lots of room to embody the
            theories & values underneath the events, artifacts, and team
            structure. Transparency, Inspection, Adaptation, Respect, Courage,
            Empiricism, Lean Thinking... these things are so much more than
            Scrum, but without those things the implementation of Scrum can
            leave a room feeling deflated, powerless, annoyed, overburdened, and
            disinterested.
          </p>
          {posts.map((itm) => (
            <PostLink {...itm} key={`scrum-${itm.title}`} />
          ))}
        </section>
      </Layout>
    </Fragment>
  );
};

export default ScrumIndex;

export async function getStaticProps() {
  const posts = await getMdPostSummaries('scrum');
  const globalData = getGlobalData();
  // globalData
  return { props: { posts, globalData } };
}
