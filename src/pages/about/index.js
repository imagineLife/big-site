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
            <div className="scrollable">
              <p>
                The{' '}
                <Link to="https://www.myersbriggs.org/my-mbti-personality-type/mbti-basics/">
                  Meyers Briggs
                </Link>{' '}
                and even the{' '}
                <Link to="https://www.16personalities.com/">
                  16 Personalities Site
                </Link>{' '}
                are great resources about personality preferences. The meyers
                briggs assessment reveals our <i>preferences</i> into 4 binary
                scales. A key detail is that this tool reveals our preferences.
                These are not absolute prescriptions of our personalities, and
                we may not even be _good at_ operating in our preferences. What
                are my preferences?
              </p>
              <ul>
                <li>
                  On interacting with the world around me:{' '}
                  <i>introversion over extroversion</i>
                </li>
                <li>
                  On processing information: <i>intuition over sensing</i>
                </li>
                <li>
                  On handle emotions: <i>thinking over feeling</i>
                </li>
                <li>
                  On approach making decisions: <i>judging over perceiving</i>
                </li>
              </ul>
              <h3>Solitude is Exciting - Introversion over Extroversion</h3>
              <p>
                I can spend days without talking to others, seemingly feeding of
                my introverted tendencies. I most-often prefer introversion over
                extroversion. Meyers-Briggs calls this "Introversion" over
                "Extroversion".
              </p>
              <h3>
                The Past & The Future more than the present - Intuition over
                Sensing
              </h3>
              <p>
                The way I process information around me tends to be more
                imaginative than practical. Some folks prefer the clarity from
                their 5 senses. I do enjoy imagining the future of what could be
                and comparing my sensory input to my thoughts and ideas. I
                prefer to process my surroundings through intuition over my five
                senses. Meyers-Briggs calls this "Intuition" over "Sensing".
              </p>
              <h3>How more than Who - Thinking over Feeling</h3>
              <p>
                When considering options or paths to go down, I think I have a
                preference toward objectivity and rationality over empathy or
                social dynamics. I think that as I get older, I'm learning that
                others emotional states is sometimes more important than
                objectivity and rationality. Nonetheless, I think I _prefer_
                making decisions from "thoughts", not "feelings". Meyers-Briggs
                calls this "Thinking" over "Feeling".
              </p>
              <h3>Planning Over Spontaneity - Judging over Perceiving</h3>
              <p>
                When it comes to making decisions on a daily basis, I prefer
                being decisive over on-the-spot improv. Clarity is my ally, and
                structures are more important to me than open spaces. Although I
                do think structures that _enable group collaboration and
                coordination_ are vital to a team, I often hope that even
                collaborative decision-making has agendas and clear
                expectations. Meyers-Briggs calls this "Judging" over
                "Perceiving".
              </p>
            </div>
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
