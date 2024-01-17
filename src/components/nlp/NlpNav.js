import React, { useContext } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NlpContext } from "./state/Provider"
import { navigate, Link } from "gatsby"

function LoginButton({ onClick }) {
  return (
    <Button variant="primary" onClick={() => navigate("/nlp/auth/")}>
      Login / Register
    </Button>
  )
}

function getDotColor(initializedStatus) {
  if (initializedStatus === "yes") return "green"
  if (initializedStatus === "loading") return "goldenrod"
  return "red"
}

export default function NlpNav({ title }) {
  const { appInitialized, authorized, ...state } = useContext(NlpContext)
  const CIRCLE_SIZE = "10px"

  let routeLinks = [{ path: "/nlp/", text: "Upload" }]

  if (authorized) {
    routeLinks.push(
      { path: "/nlp/themes/", text: "Themes" }
      // { path: "/nlp/speeches/", text: "Speeches" }
    )
  }
  let isBrowser = typeof window !== "undefined"

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          {title}
          <span
            title={appInitialized !== "yes" ? "connecting..." : "connected"}
            className="connected-dot"
            style={{
              backgroundColor: getDotColor(appInitialized),
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
        {!authorized && <LoginButton onClick={() => navigate("/nlp/auth/")} />}
        {authorized && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="rgba(0,0,0,.5)"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        )}
      </Container>
    </Navbar>
  )
}
