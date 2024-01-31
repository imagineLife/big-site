import React, { useEffect, useState, useContext } from "react"
import { NlpContext } from "../../state/Provider"
import { useForm, Controller } from "react-hook-form"
import { Button, Form } from "react-bootstrap"
// import { NlpContext } from "../../state/Provider"
import { useMutation } from "react-query"
import { useSessionStorage } from "../../hooks/useStorage"
import jsonPost from "../../state/jsonPost"
import { navigate } from "gatsby"

const RegisterForm = ({ authorized }) => {
  const [jwt, setJwt] = useSessionStorage("nlp-token")
  const { setEmail } = useContext(NlpContext)
  const [localEmail, setLocalEmail] = useState()

  // const {
  //   startRegistrationMutation,
  //   finishLoginMutation,
  //   emailVal,
  //   emailSuccessToken,
  // } = useContext(NlpContext)

  const registrationReq = async ({ url, body, jwt }) => {
    const response = await jsonPost(url, body, {
      Authorization: `Bearer ${jwt}`,
    })
    let jsonRes
    if (!response.ok) {
      jsonRes = await response.json()
      throw new Error(jsonRes.Error)
    }
    if (response.status === 200) {
      if (body.password) {
        jsonRes = await response.json()
        return jsonRes
      } else {
        return true
      }
    }
  }

  const startRegistrationMutation = useMutation(registrationReq, {
    onSuccess: (data, vars) => {
      setLocalEmail(vars.body.email)
    },
  })
  const finishRegistrationMutation = useMutation(registrationReq, {
    onSuccess: (data, vars) => {
      setJwt(data.jwt)
      setEmail(vars.body.email)
      navigate("/nlp/upload")
    },
  })

  const registerPath = "/api/users/register"
  const {
    control,
    getValues,
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

  return (
    <>
      <p>
        <b>Register your email address</b> & create a password below
      </p>
      <Form
        onSubmit={
          e => {
            e.preventDefault()
            if (startRegistrationMutation?.error?.message) {
              resetRegistration()
            } else if (startRegistrationMutation.status !== "success") {
              handleFormSubmit(handleEmailSubmit)(e)
            } else {
              handleFormSubmit(handlePasswordSubmit)(e)
            }
          }
          // (startRegistrationMutation?.error?.message && resetRegistration) ||
          // !startRegistrationMutation.isSuccess
          //   ? handleFormSubmit(handleEmailSubmit)
          //   : handleFormSubmit(handlePasswordSubmit)
        }
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
                disabled={disabled}
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
          {startRegistrationMutation?.error?.message && "Restart"}
          {!startRegistrationMutation?.error?.message &&
          startRegistrationMutation.status !== "success"
            ? "Register Email"
            : "Complete Registration"}
        </Button>
      </Form>
    </>
  )
  return <p>register here</p>
}

export default RegisterForm
