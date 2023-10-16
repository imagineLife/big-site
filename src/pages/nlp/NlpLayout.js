import React, { useContext } from 'react';
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import { NlpContext } from './Provider';

function NlpNav({ title }) { 
  const { apiReadyKey, apiInitKey, state } = useContext(NlpContext)
  function getDotColor({ state, apiData: { initialized, ready } }) {
    if (ready) return "green"
    if (initialized) return "goldenrod"
    if (state === "started") return "orange"
    return "red"
  }
  const CIRCLE_SIZE = '10px';
  const connectedDotBg = {
    backgroundColor: getDotColor({
      state: apiReadyKey ? apiReadyKey?.id : state.apiInitialized,
      apiData: { initialized: apiInitKey?.appId, ready: apiReadyKey?.appId },
    }),
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: '50%',
    display: 'inline-block',
  }
  
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          {title}
          <span
            title={apiReadyKey?.id ? "connecting..." : "connected"}
            className="connected-dot"
            style={{ ...connectedDotBg }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={window.location.pathname}>
            <Nav.Link href="/nlp">Dashboard</Nav.Link>
            <Nav.Link href="/nlp/themes">Themes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
function NlpLayout({ children }) {
  return (
      <main>
      <NlpNav title="NLP"/>
      {children}
    </main>
  )
}

export default NlpLayout