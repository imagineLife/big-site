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

    <Link to="/">Home</Link>
  </Layout>
);
export default About;
