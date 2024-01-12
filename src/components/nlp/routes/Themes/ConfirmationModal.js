import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function ConfirmationModal({
  showConfirmationModal,
  setShowConfirmationModal,
  handleModalClose,
  confirmFunction,
}) {
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
      <Modal.Body>
        Are you sure you want to{" "}
        <b>{showConfirmationModal?.themeAction?.toUpperCase()}</b> the theme{" "}
        {showConfirmationModal.theme}?
      </Modal.Body>
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
