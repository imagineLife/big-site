import React, { Fragment } from 'react';
import './index.scss';
// Components
import { Link } from 'gatsby';
import Layout from './../../components/layout';
import Hero from './../../components/hero';
import learnerImg from './learn.jpg';
import doerImg from './work.jpg';
import coffeeImg from './coffee.jpg';
import introvertImg from './introvert.jpg';
import strengthsImg from './strengths.jpg';
const About = () => (
  <Fragment>
    <Hero />
    <Layout>
      <div className="md-wrapper alternating">
        <section className="box">
          <div className="text">
            <h2>A Do-er</h2>
            <p>
              I am usually a little restless if I'm not getting something done.
              Even my down time is intentional, focused on connecting with my
              wife and/or friends, considering future plans... even solitude and
              meditation are focused and part of my goals.
            </p>
          </div>
          <div className="figure">
            <img src={doerImg} alt="do-er" />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>A Learner</h2>
            <p>
              I feel like I love the journey of traversing from casual interest
              to mastery. There's a killer excitement for me in the first piece
              of material I understand in a new topic. I also love feeling
              accomplished when I'm able to execute a complete set of principles
              or ideas I've recently learned. I also always enjoy communicating
              my understanding of new ideas I've learned to someone else.
            </p>
            <p>Some topics I'm currently learning about:</p>
            <ul>
              <li>
                {' '}
                <a href="/k8s"
                  target="_blank"
                  rel="noreferrer">
                  <b>kubernetes</b>:
                </a>{' '}
                controllers, deployments, pods, replicasets, ingress &
                networking, ConfigMaps...
              </li>
              <li>
                {' '}
                <a
                  href="https://github.com/imagineLife/frontendpipeline"
                  target="_blank" rel="noreferrer"
                >
                  <b>CI/CD Automated pipelines</b>:
                </a>{' '}
                building & deploying automated ci/cd "pipelines"
              </li>
              <li>
                <b>keeping up on some node chops</b>: some small projects on
                "scaling" a node http server
              </li>
            </ul>
          </div>
          <div className="figure">
            <img src={learnerImg} alt="learner" />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>A StrengthsFinder Advocate</h2>
            <p>
              I've been enjoying the principles of a strengths-first way of
              being, both in my own life and when working with others. When
              conflict arises, we can learn to leverage one anothers'
              personality tendencies for the best, and take steps toward
              conflict resolution by pulling out the best in one another.
            </p>
          </div>
          <div className="figure">
            <img src={strengthsImg} alt="StrengthsFinder advocate" />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>An INTJ</h2>
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
            <img src={introvertImg} alt="introvert" />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>A Coffee Fanatic</h2>
            <p>
              I roast coffee for myself and a few friends. I love my morning
              ritual of brewing myself some fresh-roasted coffee. Currently, I'm
              enjoying light-roasted beans, a little beyond first crack, brewed
              in a Chemex.
            </p>
          </div>
          <div className="figure">
            <img src={coffeeImg} alt="coffee fanatic" />
          </div>
        </section>
      </div>
      <Link to="/">Home</Link>
    </Layout>
  </Fragment>
);
export default About;
