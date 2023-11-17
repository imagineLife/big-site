import React, { useContext } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NlpContext } from "./state/Provider"
import { navigate, Link } from "gatsby"

export default function NlpNav({ title }) {
  const { appInitialized, authorized, ...state } = useContext(NlpContext)

  // { state, apiData: { initialized, ready } }
  function getDotColor() {
    return "green"
    // if (ready) return "green"
    // if (initialized) return "goldenrod"
    // if (state === "started") return "orange"
    // return "red"
  }
  const CIRCLE_SIZE = "10px"

  let routeLinks = [{ path: "/nlp/", text: "Dashboard" }]

  if (authorized) {
    routeLinks.push(
      { path: "/nlp/themes/", text: "Themes" },
      { path: "/nlp/speeches/", text: "Speeches" }
    )
  }
  let isBrowser = typeof window !== "undefined"

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          {title}
          <span
            // title={apiReadyKey?.id ? "connecting..." : "connected"}
            title="connected"
            className="connected-dot"
            style={{
              backgroundColor: getDotColor(),
              // {
              // state: apiReadyKey ? apiReadyKey?.id : state.apiInitialized,
              // apiData: {
              //   initialized: apiInitKey?.appId,
              //   ready: apiReadyKey?.appId,
              // },
              // }),
              height: CIRCLE_SIZE,
              width: CIRCLE_SIZE,
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
        </Navbar.Brand>
        {/* Nav Items */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            activeKey={isBrowser && window?.location?.pathname}
          >
            {routeLinks.map(d => (
              <Link
                key={`route-link-${d.path}`}
                className="nav-link"
                to={d.path}
              >
                {d.text}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Button variant="primary" onClick={() => navigate("/nlp/auth/")}>
          Login / Register
        </Button>{" "}
      </Container>
    </Navbar>
  )
}
