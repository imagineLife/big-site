import React, { useContext, useCallback } from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Dropdown from "react-bootstrap/Dropdown"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NlpContext } from "./state/Provider"
import { navigate, Link } from "gatsby"
import { PersonCircle } from "react-bootstrap-icons"
import { useSessionStorage } from "./hooks/useStorage"
import { useMutation } from "react-query"

async function fetchDeleteSession({ jwt }) {
  let fetchUrl = `${process.env.GATSBY_NLP_API_URL}/api/session`

  const response = await fetch(fetchUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      credentials: "include",
    },
    body: JSON.stringify({ jwt }),
  })

  if (response.status === 200) {
    let jsonRes = await response.json()
    return jsonRes
  } else {
    return false
  }
}

function AuthDD({ jwt, updateJwt }) {
  const {
    useAuthorization,
    setEmail,
    startLoginMutation,
    finishLoginMutation,
  } = useContext(NlpContext)
  const isAuthorized = useAuthorization()

  const [, , removeUiData] = useSessionStorage("nlp-data")
  const [, , removeUiThemeData] = useSessionStorage("nlp-themes")
  const logoutMutation = useMutation({
    mutationFn: fetchDeleteSession,
    mutationKey: `delete-session-${jwt}`,
    onSuccess: data => {
      updateJwt(data.jwt)
      setEmail(null)
    },
  })

  const logoutFn = useCallback(() => {
    removeUiData()
    removeUiThemeData()
    setEmail(null)
    logoutMutation.mutate({ jwt })
    startLoginMutation.reset()
    finishLoginMutation.reset()

    navigate("/nlp/auth")
  }, [jwt])

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link} id="dropdown-165516306" variant="default">
        <PersonCircle />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ left: "-85px" }}>
        {!isAuthorized && (
          <>
            <Dropdown.Item
              onClick={e => {
                e.preventDefault()
                navigate("/nlp/auth?tab=login")
              }}
            >
              Login
            </Dropdown.Item>
            <Dropdown.Item
              onClick={e => {
                e.preventDefault()
                navigate("/nlp/auth?tab=register")
              }}
            >
              Register
            </Dropdown.Item>
          </>
        )}
        {isAuthorized && (
          <Dropdown.Item
            onClick={e => {
              e.preventDefault()
              logoutFn()
            }}
          >
            Logout
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

function getDotColor(initializedStatus) {
  if (initializedStatus === "yes") return "green"
  if (initializedStatus === "loading") return "goldenrod"
  return "red"
}

export default function NlpNav({ title }) {
  const { appInitialized, useAuthorization, ...state } = useContext(NlpContext)
  const [jwt, updateJwt, removeToken] = useSessionStorage("nlp-token")
  const CIRCLE_SIZE = "10px"
  const authorized = useAuthorization()
  let routeLinks = [{ path: "/nlp/auth", text: "Account" }]
  if (authorized) {
    routeLinks.push(
      { path: "/nlp/upload", text: "Data" },
      { path: "/nlp/themes/", text: "Labels" }
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
        {/* 
          Nav Items 
        */}
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
        <AuthDD jwt={jwt} updateJwt={updateJwt} />
      </Container>
    </Navbar>
  )
}
