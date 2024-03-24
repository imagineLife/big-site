import React, { useContext, useEffect } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { NlpContext } from "./../state/Provider"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { useSessionStorage } from "../hooks/useStorage"

export default function Auth({ location: { search } }) {
  let defaultActiveKey = "loginForm"

  const { useAuthorization } = useContext(NlpContext)
  const isAuthorized = useAuthorization()
  const [jwt] = useSessionStorage("nlp-token")
  const [, setThemeData] = useSessionStorage("nlp-themes")
  useEffect(() => {
    if (isAuthorized) {
      fetch(
        `${process.env.GATSBY_NLP_API_URL}/api/users/${isAuthorized}/themes`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      ).then(res => res.json().then(setThemeData))
    }
  }, [isAuthorized])
  if (search) {
    let tabToUse = search.split("=")[1]
    if (tabToUse == "register") defaultActiveKey = "registerForm"
  }

  if (isAuthorized) return <p>You're logged in!</p>

  return (
    <Container>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        transition={false}
        id="auth-tabs"
        className="mb-3"
      >
        <Tab eventKey="loginForm" title="Login">
          <LoginForm authorized={isAuthorized} />
        </Tab>
        <Tab eventKey="registerForm" title="Register">
          <RegisterForm />
        </Tab>
      </Tabs>
    </Container>
  )
}
