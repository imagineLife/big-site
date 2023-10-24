import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button } from "react-bootstrap"
import { useMutation } from "react-query"

/*
  login api fn
*/
const loginUser = async data => {
  console.log("loginUser data")
  console.log(data)

  const API_HOST = "http://localhost:3000"
  const response = await fetch(`${API_HOST}/nlp/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

/*
  component
*/
export default function Auth() {
  const { handleSubmit, errors, control } = useForm()

  const mutation = useMutation(loginUser)

  const onSubmit = data => {
    console.log("onSubmit data")
    console.log(data)

    mutation.mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, value, ref } }) => (
            <Form.Control
              onChange={onChange}
              value={value}
              ref={ref}
              type="email"
              placeholder="Enter email"
              name="email"
            />
          )}
        />
        <Form.Text className="text-danger">{errors?.email?.message}</Form.Text>
      </Form.Group>

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

      {/* <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              onChange={onChange}
              value={value}
              ref={ref}
              type="email"
              isInvalid={errors?.email}
              placeholder="Enter email"
            />
          )}
        />
        <Form.Text className="text-muted">
          We need a valid email address.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors?.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              onChange={onChange}
              value={value}
              ref={ref}
              type="password"
              isInvalid={errors?.password}
              placeholder="Enter password"
            />
          )}
        />
        <Form.Text className="text-muted">Don't forget it!!</Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
