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
  localKeyword,
  setLocalKeyword,
  keywordList,
  setLocalKeywordList,
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
              onChange={onChange}
              value={value}
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
            setLocalKeywordList(l => [...l, localKeyword])
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
  const { errors, control } = useForm()
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
          setLocalKeyword={setLocalKeyword}
          keywordList={keywordList}
          setLocalKeywordList={setLocalKeywordList}
        />
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => confirmFunction(showConfirmationModal.theme)}
        >
          {showConfirmationModal?.themeAction?.toUpperCase()}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
