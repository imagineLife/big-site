import React, { useContext, useState } from "react"
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

  return response.status === 200
}

function AuthDD() {
  const { authorized } = useContext(NlpContext)
  const [jwt, , removeToken] = useSessionStorage("nlp-token")
  const [, , removeUiData] = useSessionStorage("nlp-data")
  const [loggedOut, setLoggedOut] = useState(false)
  const logoutMutation = useMutation({
    mutationFn: fetchDeleteSession,
    mutationKey: `delete-session-${jwt}`,
    onSucces: (data, vars) => {
      console.log(
        "%c deleted session!",
        "background-color: pink; color: black;"
      )
      console.log("data")
      console.log(data)
      console.log("vars")
      console.log(vars)
    },
  })

  const logoutFn = () => {
    removeToken()
    removeUiData()
    setLoggedOut(true)
    logoutMutation.mutate({ jwt })
    navigate("/nlp/auth")
  }

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link} id="dropdown-165516306" variant="default">
        <PersonCircle />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ left: "-85px" }}>
        {!authorized && (
          <>
            <Dropdown.Item onClick={e => e.preventDefault()}>
              Login
            </Dropdown.Item>
            <Dropdown.Item onClick={e => e.preventDefault()}>
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

function UserAvatar() {
  return (
    <svg
      cursor="pointer"
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
  )
}

function MyDropdown() {
  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle
        as={Nav.Link}
        data-toggle="dropdown"
        id="dropdown-67443507"
        variant="default"
        className="m-0"
      >
        <i className="nc-icon nc-planet"></i>
        <span className="notification">5</span>
        <span className="d-lg-none ml-1">Notification</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
          Notification 1
        </Dropdown.Item>
        <Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
          Notification 2
        </Dropdown.Item>
        <Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
          Notification 3
        </Dropdown.Item>
        <Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
          Notification 4
        </Dropdown.Item>
        <Dropdown.Item href="#pablo" onClick={e => e.preventDefault()}>
          Another notification
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
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

  let routeLinks = [{ path: "/nlp/auth", text: "Account" }]
  console.log("%c NlpNav", "background-color: pink; color: black;")
  console.log("authorized")
  console.log(authorized)
  console.log("%c ---", "background-color: pink; color: black;")

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
        {/* {!authorized && <LoginButton onClick={() => navigate("/nlp/auth/")} />} */}
        {/* {!authorized && <AuthDD />} */}
        {/* {authorized && <UserAvatar />} */}
        <AuthDD />
      </Container>
    </Navbar>
  )
}
