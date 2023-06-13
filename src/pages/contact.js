import React, { Fragment } from 'react';
import './index.scss';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';

const Index = () => {
  const handleSubmit = event => {
    event.preventDefault()

    const myForm = event.target
    const formData = new FormData(myForm)

    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert("thanks for the submission!"))
      .catch(error => alert(error))
  }

  return (
    <Fragment>
      <Hero />
      <Layout>
        <form name="contact" data-netlify="true" onSubmit={handleSubmit}>
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
              Message <input type="text" name="message" />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
          <input type="hidden" name="form-name" value="contact" />
        </form>
      </Layout>
    </Fragment>
  )
};
export default Index;
