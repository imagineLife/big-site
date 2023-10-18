import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button } from "react-bootstrap"
import { useMutation } from "react-query"

/*
  login api fn
*/ 
const loginUser = async data => {
  const response = await fetch("http://localhost:3000/nlp/api/login", {
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
  const { register, handleSubmit, errors, control } = useForm()

  const mutation = useMutation(loginUser)

  const onSubmit = data => {
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
          render={() => (
            <Form.Control type="email" placeholder="Enter email" name="email" />
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
          render={() => (
            <Form.Control
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
