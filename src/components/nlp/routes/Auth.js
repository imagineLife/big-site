import React, { useContext, useEffect } from "react"
// import { redirectTo } from "@reach/router"
import { useForm, Controller } from "react-hook-form"
import { Form, Button } from "react-bootstrap"
import { NlpContext } from "./../state/Provider"

/*
  component
*/
export default function Auth() {
  const {
    startLoginMutation,
    finishLoginMutation,
    emailVal,
    authorized,
    emailSuccessToken,
  } = useContext(NlpContext)
  const START_URL = "/api/users/email"
  const FINISH_URL = "/api/users/pw"
  const {
    handleSubmit: handleFormSubmit,
    errors,
    control,
    setFocus,
  } = useForm({ email: "", password: "" })

  const handleEmailSubmit = async ({ email }) => {
    startLoginMutation.mutate({
      url: `${process.env.GATSBY_NLP_API_URL}${START_URL}`,
      body: { email },
    })
  }

  const handlePasswordSubmit = async ({ password }) => {
    finishLoginMutation.mutate({
      url: `${process.env.GATSBY_NLP_API_URL}${FINISH_URL}`,
      body: { email: emailVal, password, emailToken: emailSuccessToken },
    })
  }

  // focus pw input after email success
  useEffect(() => {
    if (startLoginMutation.isSuccess && !authorized) {
      setFocus("password")
    }
  }, [startLoginMutation?.isSuccess, authorized])

  if (authorized) return <p>You're logged in!</p>
  return (
    <>
      <Form
        onSubmit={
          !startLoginMutation.isSuccess
            ? handleFormSubmit(handleEmailSubmit)
            : handleFormSubmit(handlePasswordSubmit)
        }
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            disabled={startLoginMutation.isSuccess}
            render={({ field: { onChange, value, ref, disabled } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                type="email"
                placeholder="Enter email"
                name="email"
                disabled={disabled}
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors?.email?.message}
          </Form.Text>
        </Form.Group>

        {startLoginMutation.isSuccess && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

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

            <Form.Text className="text-danger">
              {errors?.password?.message}
            </Form.Text>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}
