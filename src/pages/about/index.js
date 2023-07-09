import React, { Fragment, useState } from 'react';
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
import linkedIn from './linkedin.svg';
import github from "./github.svg"

const aboutContactLinks = [
  {
    to: "https://www.linkedin.com/in/eric-laursen-6a1b20b8/",
    src: linkedIn,
  },
  {
    to: "https://github.com/imagineLife",
    src: github,
  },
]

const ContactForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [submitted,setSubmitted] = useState(false)
  
  const handleSubmit = event => {
    event.preventDefault()

    const myForm = event.target
    const formData = new FormData(myForm)

    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setShowForm(false)
        setSubmitted(true)
      })
      .catch(() => {
        setShowForm(false)
        setSubmitted(true)
      })
  }

  return (
    <form name="contact" data-netlify="true" onSubmit={handleSubmit}>
      {showForm === true && (
        <>
          <p>
            <label>
              Name <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Email <input type="email" name="email" />
            </label>
          </p>

          <p>
            <label>
              Message <textarea name="message" />
            </label>
          </p>
        </>
      )}
      <p>
        {showForm && <button type="submit">Send</button>}
        {!showForm && (
          <button
            type="button"
            onClick={() => {
              if (!submitted) {
                setShowForm(true)
              }
            }}
          >
            {!submitted && "Contact Me"}
            {submitted && "Thanks!"}
          </button>
        )}
      </p>
      <input type="hidden" name="form-name" value="contact" />
    </form>
  )
}
const About = () => {
  return (
    <Fragment>
      <Hero />
      <Layout>
        <div className="md-wrapper alternating">
          <section className="box">
            <div className="text">
              <h2>A TL;DR</h2>
              <p>
                I'm a <a href="#a-doer">do-er</a>. I'm a{" "}
                <a href="#a-learner">learner</a>. I'm a{" "}
                <a href="#sf">CliftonStrengths Advocate</a>. Meyers Briggs says
                I prefer to be an <a href="#mb">INJT</a>. I'm also a bit of a{" "}
                <a href="#coffee">coffee fanatic</a>.
              </p>
              <ContactForm />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h2 id="a-doer">A Do-er</h2>
              <p>
                I am usually a little restless if I'm not getting something
                done. Even my down time is has intentional elements: even
                solitude and meditation are focused and part of my goals.
              </p>
            </div>
            <div className="figure">
              <img src={doerImg} alt="do-er" />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h2 id="a-learner">A Learner</h2>
              <p>
                I feel like I love the journey of traversing from casual
                interest to mastery. There's a killer excitement for me in the
                first piece of material I understand in a new topic. I also love
                feeling accomplished when I'm able to execute a complete set of
                principles or ideas I've recently learned. I also always enjoy
                communicating my understanding of new ideas I've learned to
                someone else.
              </p>
              <p>Some topics I'm currently learning about:</p>
              <ul>
                <li>
                  What{" "}
                  <a
                    href="https://ecornell.cornell.edu/certificates/leadership-and-strategic-management/engineering-leadership/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>a bit of academia</b>
                  </a>{" "}
                  has to say about engineering leadership
                </li>
                <li>
                  {" "}
                  <a href="/k8s" target="_blank" rel="noreferrer">
                    <b>kubernetes</b>:
                  </a>{" "}
                  I recently got{" "}
                  <a
                    href="https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/9c6591a6-3adf-4184-8a59-63d13c620470-eric-jake-laursen-e27e0a5d-ce83-4006-8b9f-8f05509843d4-certificate.pdf"
                    target="_blank"
                  >
                    CKAD certified
                  </a>{" "}
                  and learned a ton about a stack of technologies "beyond" my
                  most-practiced (M/P)ERN stack (
                  <a href="/mongo" target="_blank">
                    Mongo
                  </a>
                  /Postgres, Express, React, <a href="/node">Node</a>)
                </li>
                <li>
                  <b>CI/CD Automated pipelines</b>: building & deploying
                  automated ci/cd "pipelines" for tooling like a frontend build
                  system, a node_module, a rest api, an api in a docker
                  container...
                </li>
                <li>
                  <b>keeping up </b>
                  on some core{" "}
                  <a href="/javascript" target="_blank">
                    JS
                  </a>{" "}
                  and{" "}
                  <a href="/node" target="_blank">
                    Node
                  </a>{" "}
                  chops: some small studies on "scaling" node, using streams to
                  minimize buffered content & maximize throughput, worker
                  threads, etc
                </li>
                <li>
                  <b>
                    <a href="/nginx" target="_blank">
                      nginx:
                    </a>{" "}
                  </b>
                  an http server with perhaps more singleness-of-purpose than a
                  node server
                </li>
              </ul>
            </div>
            <div className="figure">
              <img src={learnerImg} alt="learner" />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h2 id="sf">A CliftonStrengths Advocate</h2>
              <p>
                I've been enjoying the principles of a strengths-first way of
                being, both in my own life and when working with others. When
                conflict arises, we can learn to leverage one anothers'
                personality tendencies for the best, and take steps toward
                conflict resolution by pulling out the best in one another. (
                <i>quotes below from gallups site</i>)
              </p>
              <ul>
                <li>
                  {" "}
                  <a
                    href="https://www.gallup.com/cliftonstrengths/en/252293/learner-theme.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>Learner</b>
                  </a>{" "}
                  ...a great desire to learn and want to continuously improve.
                  The process of learning, rather than the outcome... is
                  exciting to me!
                </li>
                <li>
                  {" "}
                  <a
                    href="https://www.gallup.com/cliftonstrengths/en/252278/input-theme.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>Input</b>
                  </a>{" "}
                  ...have a need to collect and archive... information, ideas,
                  artifacts...
                </li>
                <li>
                  {" "}
                  <a
                    href="https://www.gallup.com/cliftonstrengths/en/252215/deliberative-theme.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>Deliberative</b>
                  </a>{" "}
                  ...described by the serious care (I) take in making decisions
                  or choices. (I) anticipate obstacles.
                </li>
                <li>
                  {" "}
                  <a
                    href="https://www.gallup.com/cliftonstrengths/en/252176/command-theme.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>Command</b>
                  </a>{" "}
                  ...have presence. (I) can take control of a situation and make
                  decisions.
                </li>
                <li>
                  {" "}
                  <a
                    href="https://www.gallup.com/cliftonstrengths/en/252134/achiever-theme.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>Achiever</b>
                  </a>{" "}
                  ...work hard to possess a great deal of stamina... take
                  immense satisfactioin in being busy and productive.
                </li>
              </ul>
            </div>
            <div className="figure">
              <img src={strengthsImg} alt="StrengthsFinder advocate" />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h2 id="mb">An INTJ</h2>
              <p>
                Per{" "}
                <a
                  href="https://www.myersbriggs.org/my-mbti-personality-type/mbti-basics/"
                  target="_blank"
                  rel="noreferrer"
                >
                  The MeyersBriggs
                </a>{" "}
                personality assessment, I'm an INTJ.
              </p>
              <p>
                Check out the{" "}
                <a
                  href="https://www.16personalities.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  16 personalities site
                </a>{" "}
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
              <img src={introvertImg} alt="introvert" />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h2 id="coffee">A Coffee Fanatic</h2>
              <p>
                I roast coffee & I love my morning ritual of brewing myself some
                fresh-roasted coffee. Currently, I'm enjoying light-roasted
                beans, just at first crack, brewed in a Chemex or a 1-Cup V60. I
                recently purcahse the{" "}
                <a
                  href="https://fellowproducts.com/products/ode-brew-grinder-gen-2"
                  target="blank"
                >
                  Fellow Ode Gen2
                </a>{" "}
                and I love it for the pour-over grinds!
              </p>
            </div>
            <div className="figure">
              <img src={coffeeImg} alt="coffee fanatic" />
            </div>
          </section>
          <section className="box">
            <div className="text">
              <h4>Links</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {aboutContactLinks.map(d => (
                  <Link to={d.to} target="_blank" key={d.to}>
                    <img style={{ width: "50px" }} src={d.src} alt={d.to} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
        <Link to="/">Home</Link>
      </Layout>
    </Fragment>
  )
}
export default About;

export function Head() { 
  return (
    <Fragment>
      <title>About Me</title>
      <meta
        name="description"
        content="I'm a do-er, a learner, and I enjoy working with people, data, and tech!"
      />
      <meta property="og:title" content="Eric Laursen" />
      <meta property="og:url" content="http://laursen.tech" />
    </Fragment>
  );
}