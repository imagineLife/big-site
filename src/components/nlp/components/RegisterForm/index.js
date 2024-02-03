import React, { useEffect, useState, useContext } from "react"
import { NlpContext } from "../../state/Provider"
import { useForm, Controller } from "react-hook-form"
import { Button, Form } from "react-bootstrap"
import { useMutation } from "react-query"
import { useSessionStorage } from "../../hooks/useStorage"

const RegisterForm = ({ authorized }) => {
  const [jwt] = useSessionStorage("nlp-token")
  const { finishRegistrationMutation, registrationReq } = useContext(NlpContext)
  const [localEmail, setLocalEmail] = useState()

  const startRegistrationMutation = useMutation(registrationReq, {
    onSuccess: (data, vars) => {
      setLocalEmail(vars.body.email)
    },
  })

  const registerPath = "/api/users/register"
  const {
    control,
    handleSubmit: handleFormSubmit,
    setFocus,
    reset: resetForm,
  } = useForm({ email: "", password: "" })

  // focus pw input after email success
  useEffect(() => {
    if (startRegistrationMutation.isSuccess && !authorized) {
      setFocus("password")
    }
  }, [startRegistrationMutation?.isSuccess, authorized])

  const handleEmailSubmit = async ({ email }) => {
    startRegistrationMutation.mutate({
      url: `${process.env.GATSBY_NLP_API_URL}${registerPath}`,
      body: { email },
      jwt,
    })
  }

  const handlePasswordSubmit = async ({ email, password }) => {
    finishRegistrationMutation.mutate({
      url: `${process.env.GATSBY_NLP_API_URL}${registerPath}`,
      body: { email: localEmail, password },
      jwt,
    })
  }

  const resetRegistration = () => {
    startRegistrationMutation.reset()
    resetForm()
  }

  let registerText = "Register Email"
  if (startRegistrationMutation?.status === "error") {
    registerText = "Restart"
  }
  if (startRegistrationMutation?.status === "success") {
    registerText = "Complete Registration"
  }

  return (
    <>
      <p>
        <b>Register your email address</b> & create a password below
      </p>
      <Form
        onSubmit={e => {
          e.preventDefault()
          if (startRegistrationMutation?.error?.message) {
            resetRegistration()
          } else if (startRegistrationMutation.status !== "success") {
            handleFormSubmit(handleEmailSubmit)(e)
          } else {
            handleFormSubmit(handlePasswordSubmit)(e)
          }
        }}
      >
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            disabled={startRegistrationMutation.isSuccess}
            render={({ field: { onChange, value, ref, disabled } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                type="email"
                placeholder="Enter email"
                name="email"
                disabled={disabled || startRegistrationMutation?.error}
              />
            )}
          />
          {startRegistrationMutation?.status === "error" && (
            <Form.Text className="text-danger">
              {startRegistrationMutation?.error?.message}
            </Form.Text>
          )}
        </Form.Group>

        {/* Password field */}
        {startRegistrationMutation.isSuccess && (
          <Form.Group controlId="formPassword">
            <Form.Label>Create A Password</Form.Label>

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, value, ref } }) => (
                <Form.Control
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              )}
            />

            {finishRegistrationMutation?.status === "error" && (
              <Form.Text className="text-danger">
                {finishRegistrationMutation?.error?.message}
              </Form.Text>
            )}
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {registerText}
        </Button>
      </Form>
    </>
  )
  return <p>register here</p>
}

export default RegisterForm
