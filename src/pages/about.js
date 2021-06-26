import React, { Fragment } from 'react';

// Components
import { Link } from 'gatsby';
import Layout from './../components/layout';
import Hero from './../components/hero';

const About = () => (
  <Fragment>
    <Hero />
    <Layout>
      <h2>A Learner</h2>
      <p>
        I feel like I love the journey of traversing from casual interest to
        mastery. There's a killer excitement for me in the first piece of
        material I understand in a new topic. I also love feeling accomplished
        when I'm able to execute a complete set of principles or ideas I've
        recently learned. I also always enjoy communicating my understanding of
        new ideas I've learned to someone else.
      </p>
      <p>
        Some topics I'm currently learning about: graphQL, microservices and
        service registration and discovery, front-end caching for faster UI
        delivery of data-intensive web applications, leadership and methods for
        categoriing and approaching 'types' of problems in an org...
      </p>

      <h2>A Do-er</h2>
      <p>
        I am restless if I'm not intentionally getting something done, or on my
        way to doing something. Even my down time is intentional, focused on
        connecting with my wife and/or friends, considering future plans...
        solitude and meditaion are task-oriented and achievable for me.
      </p>

      <h2>A Coffee Fanatic</h2>
      <p>
        I roast coffee for myself and a few close folks. I love my daily morning
        ritual of getting up and brewing myself some fresh-roasted coffee.
        Currently, I'm enjoying Honduran beans, roasted a little beyond first
        crack in about 8 and a half minutes brewed in a Chemex.
      </p>

      <h2>An INTJ</h2>
      <p>
        I can spend days without talking to others, seemingly feeding of my
        introverted tendencies. I most-often prefer introversion over
        extroversion. Meyers-Briggs calls this "Introversion" over
        "Extroversion".
      </p>
      <p>
        The way I process information around me tends to be more imaginative
        than practical. Some folks prefer the clarity from their 5 senses. I do
        enjoy imagining the future of what could be and comparing my sensory
        input to my thoughts and ideas. I prefer to process my surroundings
        through intuition over my five senses. Meyers-Briggs calls this
        "Intuition" over "Sensing".
      </p>
      <p>
        When considering options or paths to go down, I think I have a
        preference toward objectivity and rationality over empathy or social
        dynamics. I think that as I get older, I'm learning that others
        emotional states is sometimes more important than objectivity and
        rationality. Nonetheless, I think I _prefer_ making decisions from
        "thoughts", not "feelings". Meyers-Briggs calls this "Thinking" over
        "Feeling".
      </p>
      <p>
        When it comes to making decisions on a daily basis, I prefer being
        decisive over on-the-spot improv. Clarity is my ally, and structures are
        more important to me than open spaces. Although I do think structures
        that _enable group collaboration and coordination_ are vital to a team,
        I often hope that even collaborative decision-making has agendas and
        clear expectations. Meyers-Briggs calls this "Judging" over
        "Perceiving".
      </p>

      <h2>A StrengthsFinder Advocate</h2>
      <p>I've</p>
      <Link to="/">Home</Link>
    </Layout>
  </Fragment>
);
export default About;
