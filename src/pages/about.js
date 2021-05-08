import React from 'react';

// Components
import { Link } from 'gatsby';
import Layout from './../components/layout';

const About = () => (
  <Layout>
    <section className="about-section">
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
    </section>
    <section className="about-section">
      <h2>A Do-er</h2>
      <p>
        I am restless if I'm not intentionally getting something done. Even my
        down time is intentional, focused on connecting with my wife and/or
        friends, considering future plans, even solitude and meditaion are
        task-oriented and achievable for me.
      </p>
    </section>
    <section className="about-section">
      <h2>A Coffee Fanatic</h2>
      <p>
        I roast coffee for myself and a few close folks. I love my daily morning
        ritual of getting up and brewing myself some fresh-roasted coffee.
        Currently, I'm enjoying Honduran beans, roasted a little beyond first
        crack in about 8 and a half minutes brewed in a Chemex.
      </p>
    </section>
    <section className="about-section">
      <h2>An INTJ</h2>
      <p>
        I can spend days without talking to others, seemingly feeding of my
        introverted tendencies.
      </p>
      <p>
        The way I process the info around me is more imaginative than practical.
        Some folks prefer the clarity from ther 5 senses. I do enjoy imagining
        the future of what could be and comparing my sensory input to my
        memories.
      </p>
      <p>
        When considering options or paths to go down, I do prefer knowledge,
        objectivity, and empiricism. Other might follow their hearts, but I
        prefer thought-intensive decisions.
      </p>
      <p>
        I am more confortable when a plan is in place rather than figuring out
        the path along the way. THis is complex for me, as the seeming nature of
        the work I am in is constantly changing, anad I try to look to those
        who've gone before me as trusted voices for insights.
      </p>
    </section>
    <section className="about-section">
      <h2>A StrengthsFinder Advocate</h2>
      <p>
        Pursuing this socail life through an influence of talents & strengths
        both for myself and when working with others has made a drastic positive
        impact on my life. I work to understand the positive aspects of others'
        personalities on interpersonal and team dynamics.
      </p>
    </section>
    <Link to="/">Home</Link>
  </Layout>
);
export default About;
