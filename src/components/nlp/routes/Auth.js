import React, { useContext } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { NlpContext } from "./../state/Provider"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

export default function Auth({ location: { search } }) {
  let defaultActiveKey = "loginForm"

  const { authorized } = useContext(NlpContext)
  if (search) {
    let tabToUse = search.split("=")[1]
    if (tabToUse == "register") defaultActiveKey = "registerForm"
  }
  // const params = useParams()
  if (authorized) return <p>You're logged in!</p>

  return (
    <Container>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        transition={false}
        id="auth-tabs"
        className="mb-3"
      >
        <Tab eventKey="loginForm" title="Login">
          <LoginForm authorized={authorized} />
        </Tab>
        <Tab eventKey="registerForm" title="Register">
          <RegisterForm />
        </Tab>
      </Tabs>
    </Container>
  )
}
