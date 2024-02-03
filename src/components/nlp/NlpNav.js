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
  console.log(
    "%c fetchDeleteSession",
    "background-color: orange; color: black;"
  )
  console.log("jwt")
  console.log(jwt)

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

function AuthDD({ jwt }) {
  console.log("%c AuthDD", "background-color: brown; color: black;")

  const { authorized, setEmail } = useContext(NlpContext)
  console.log("jwt from session:", jwt)

  const [, , removeUiData] = useSessionStorage("nlp-data")
  const logoutMutation = useMutation({
    mutationFn: fetchDeleteSession,
    mutationKey: `delete-session-${jwt}`,
    onSuccess: (data, vars) => {
      console.log(
        "%c deleted session",
        "background-color: white; color: black;"
      )
      console.log("data")
      console.log(data)
      console.log("vars")
      console.log(vars)
    },
  })

  const logoutFn = useCallback(() => {
    console.log("logoutFn jwt: ", jwt)
    removeUiData()
    setEmail(null)
    logoutMutation.mutate({ jwt })
    navigate("/nlp/auth")
  }, [jwt])

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link} id="dropdown-165516306" variant="default">
        <PersonCircle />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ left: "-85px" }}>
        {!authorized && (
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
        {authorized && (
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
  const { appInitialized, authorized, ...state } = useContext(NlpContext)
  const [jwt, , removeToken] = useSessionStorage("nlp-token")
  const CIRCLE_SIZE = "10px"

  let routeLinks = [{ path: "/nlp/auth", text: "Account" }]
  console.log("%c ---NlpNav", "background-color: yellow; color: black;")
  console.log("authorized")
  console.log(authorized)
  console.log("%c ---", "background-color: yellow; color: black;")

  if (authorized) {
    routeLinks.push(
      { path: "/nlp/upload", text: "Import" },
      { path: "/nlp/themes/", text: "Themes" }
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
        <AuthDD />
        {/* {jwt && <AuthDD jwt={jwt} />} */}
      </Container>
    </Navbar>
  )
}
