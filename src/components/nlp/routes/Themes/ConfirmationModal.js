import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import { useForm, Controller } from "react-hook-form"

const EditDeleteBody = ({ theme, actionType }) => (
  <Modal.Body>
    Are you sure you want to <b>{actionType?.toUpperCase()}</b> the theme{" "}
    {theme}?
  </Modal.Body>
)

const CreateBody = ({
  theme,
  errors,
  control,
  localTheme,
  setLocalKeyword,
  keywordList,
  setLocalKeywordList,
  getValues,
}) => {
  return (
    <Modal.Body>
      <Form.Group controlId="theme">
        <Form.Label>Theme:</Form.Label>
        <Controller
          control={control}
          name="theme"
          defaultValue=""
          render={({ field: { ref, onChange, value } }) => (
            <Form.Control
              type="text"
              name="theme"
              ref={ref}
              onChange={e => {
                e.preventDefault()
                onChange(e)
              }}
              value={localTheme}
            />
          )}
        />
        {errors?.theme && <p>{errors?.theme?.message}</p>}
      </Form.Group>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Form.Group controlId="keyword-entry">
          <Form.Label>start with some keywords</Form.Label>
          <Controller
            control={control}
            name="keyword-entry"
            defaultValue=""
            render={({ field: { ref, onChange, value } }) => (
              <Form.Control
                type="text"
                name="keyword-entry"
                ref={ref}
                onChange={e => {
                  e.preventDefault()
                  onChange(e)
                  setLocalKeyword(e.target.value)
                }}
                value={value}
              />
            )}
          />
          {errors?.theme && <p>{errors?.theme?.message}</p>}
        </Form.Group>

        <Button
          onClick={() => {
            const formVals = getValues()
            setLocalKeywordList(l => [...l, formVals["keyword-entry"]])
          }}
          style={{
            padding: ".375rem .75rem",
            alignSelf: "flex-end",
          }}
        >
          Add Keyword
        </Button>
      </div>

      <Stack
        direction="horizontal"
        gap={2}
        style={{ flexWrap: "wrap", padding: "10px 5px" }}
      >
        {keywordList?.map(w => (
          <Badge
            bg="light"
            className="theme-pill"
            key={`badge-${theme}-${w}`}
            // onClick={() =>
            // setRowAction({
            //   type: "edit-theme-word",
            //   theme,
            //   word: w,
            //   originalWord: w,
            // })
            // }
            pill
          >
            <span>{w}</span>
          </Badge>
        ))}
      </Stack>
    </Modal.Body>
  )
}

export default function ConfirmationModal({
  showConfirmationModal,
  setShowConfirmationModal,
  handleModalClose,
  confirmFunction,
}) {
  const { errors, control, getValues, reset } = useForm({
    theme: "",
    "keyword-entry": "",
  })
  const [localTheme, setLocalTheme] = useState()
  const [localKeyword, setLocalKeyword] = useState()
  const [keywordList, setLocalKeywordList] = useState([])

  const showEditDeleteBody =
    showConfirmationModal?.themeAction === "Edit" ||
    showConfirmationModal?.themeAction === "Delete"

  const showCreateBody = showConfirmationModal?.themeAction === "Create"
  return (
    <Modal
      show={showConfirmationModal}
      onHide={() => {
        setShowConfirmationModal(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{showConfirmationModal?.themeAction} Theme</Modal.Title>
      </Modal.Header>
      {showEditDeleteBody && (
        <EditDeleteBody
          theme={showConfirmationModal?.theme}
          actionType={showConfirmationModal?.themeAction?.toUpperCase()}
        />
      )}
      {showCreateBody && (
        <CreateBody
          errors={errors}
          control={control}
          localKeyword={localKeyword}
          localTheme={localTheme}
          setLocalKeyword={setLocalKeyword}
          setLocalTheme={setLocalTheme}
          keywordList={keywordList}
          setLocalKeywordList={setLocalKeywordList}
          getValues={getValues}
        />
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (showConfirmationModal.themeAction == "Delete") {
              confirmFunction(showConfirmationModal.theme)
            } else if (showConfirmationModal.themeAction !== "Create") {
              confirmFunction(showConfirmationModal.themeAction)
            } else {
              confirmFunction({
                theme: localTheme || getValues().theme,
                keywordList,
              })
              setLocalKeywordList([])
              setLocalKeyword()
            }
            reset()
          }}
        >
          {showConfirmationModal?.themeAction?.toUpperCase()}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
