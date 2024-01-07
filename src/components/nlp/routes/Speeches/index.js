import React from "react"
import Form from "react-bootstrap/Form"
import { useForm, Controller } from "react-hook-form"

function SpeechCreator() {
  const { handleSubmit, errors, control } = useForm()

  const onSubmit = data => {
    console.log("onSubmit Data!")
    console.log(data)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* SPEAKER */}
      <Form.Group controlId="formSpeaker">
        <Form.Label>Speaker</Form.Label>
        <Controller
          control={control}
          name="speaker"
          defaultValue=""
          render={({ field: { ref, onChange, value } }) => (
            <Form.Control
              type="text"
              placeholder="Speaker"
              name="speaker"
              ref={ref}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors?.speaker && <p>{errors?.speaker?.message}</p>}
      </Form.Group>

      {/* DATE */}
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Controller
          control={control}
          name="date"
          defaultValue=""
          render={({ field: { ref, onChange, value } }) => (
            <Form.Control
              type="date"
              name="date"
              ref={ref}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors?.date && <p>{errors?.date?.message}</p>}
      </Form.Group>
    </Form>
  )
}

function Speeches() {
  return (
    <>
      <h3>Speech editor</h3>
      <SpeechCreator />
    </>
  )
}

export default Speeches
