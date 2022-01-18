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
            <h2>A Learner</h2>
            <p>
              I feel like I love the journey of traversing from casual interest
              to mastery. There's a killer excitement for me in the first piece
              of material I understand in a new topic. I also love feeling
              accomplished when I'm able to execute a complete set of principles
              or ideas I've recently learned. I also always enjoy communicating
              my understanding of new ideas I've learned to someone else.
            </p>
            <p>
              Some topics I'm currently learning about: graphQL, microservices
              and service registration and discovery, front-end caching for
              faster UI delivery of data-intensive web applications, leadership
              and methods for categorizing and approaching 'types' of problems
              in an org...
            </p>
          </div>
          <div className="figure">
            <img src={learnerImg} />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>A Do-er</h2>
            <p>
              I am restless if I'm not intentionally getting something done, or
              on my way to doing something. Even my down time is intentional,
              focused on connecting with my wife and/or friends, considering
              future plans... solitude and meditaion are task-oriented and
              achievable for me.
            </p>
          </div>
          <div className="figure">
            <img src={doerImg} />
          </div>
        </section>

        <section className="box">
          <div className="text">
            <h2>A Coffee Fanatic</h2>
            <p>
              I roast coffee for myself and a few close folks. I love my daily
              morning ritual of getting up and brewing myself some fresh-roasted
              coffee. Currently, I'm enjoying Honduran beans, roasted a little
              beyond first crack in about 8 and a half minutes brewed in a
              Chemex.
            </p>
          </div>
          <div className="figure">
            <img src={coffeeImg} />
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
            <img src={introvertImg} />
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
            <img src={strengthsImg} />
          </div>
        </section>
      </div>
      <Link to="/">Home</Link>
    </Layout>
  </Fragment>
);
export default About;
