import React, { useContext } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { NlpContext } from "./../state/Provider"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

export default function Auth() {
  const { authorized } = useContext(NlpContext)

  if (authorized) return <p>You're logged in!</p>

  return (
    <Container>
      <Tabs
        defaultActiveKey="loginForm"
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
