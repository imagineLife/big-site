import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import Layout from './../components/layout';
import Hero from './../components/hero';

export default function Intj() {
  return;
  <Fragment>
    <Hero />
    <Layout>
      <div className="md-wrapper alternating">
        <p>
          The{' '}
          <Link to="https://www.myersbriggs.org/my-mbti-personality-type/mbti-basics/">
            Meyers Briggs
          </Link>{' '}
          and even the{' '}
          <Link to="https://www.16personalities.com/">
            16 Personalities Site
          </Link>{' '}
          are great resources about personality preferences. The meyers briggs
          assessment reveals our <i>preferences</i> into 4 binary scales. A key
          detail is that this tool reveals our preferences. These are not
          absolute prescriptions of our personalities, and we may not even be
          _good at_ operating in our preferences. What are my preferences?
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
          I can spend days without talking to others, seemingly feeding of my
          introverted tendencies. I most-often prefer introversion over
          extroversion. Meyers-Briggs calls this "Introversion" over
          "Extroversion".
        </p>
        <h3>
          The Past & The Future more than the present - Intuition over Sensing
        </h3>
        <p>
          The way I process information around me tends to be more imaginative
          than practical. Some folks prefer the clarity from their 5 senses. I
          do enjoy imagining the future of what could be and comparing my
          sensory input to my thoughts and ideas. I prefer to process my
          surroundings through intuition over my five senses. Meyers-Briggs
          calls this "Intuition" over "Sensing".
        </p>
        <h3>How more than Who - Thinking over Feeling</h3>
        <p>
          When considering options or paths to go down, I think I have a
          preference toward objectivity and rationality over empathy or social
          dynamics. I think that as I get older, I'm learning that others
          emotional states is sometimes more important than objectivity and
          rationality. Nonetheless, I think I _prefer_ making decisions from
          "thoughts", not "feelings". Meyers-Briggs calls this "Thinking" over
          "Feeling".
        </p>
        <h3>Planning Over Spontaneity - Judging over Perceiving</h3>
        <p>
          When it comes to making decisions on a daily basis, I prefer being
          decisive over on-the-spot improv. Clarity is my ally, and structures
          are more important to me than open spaces. Although I do think
          structures that _enable group collaboration and coordination_ are
          vital to a team, I often hope that even collaborative decision-making
          has agendas and clear expectations. Meyers-Briggs calls this "Judging"
          over "Perceiving".
        </p>
      </div>
    </Layout>
  </Fragment>;
}
