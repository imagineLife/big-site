import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function ConfirmationModal({
  showConfirmationModal,
  setShowConfirmationModal,
  handleModalClose,
}) {
  return (
    <Modal
      show={showConfirmationModal}
      onHide={() => {
        setShowConfirmationModal(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{showConfirmationModal?.editOrDelete} Theme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to{" "}
        <b>{showConfirmationModal?.editOrDelete?.toUpperCase()}</b> theme{" "}
        {showConfirmationModal.theme}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleModalClose}>
          {showConfirmationModal?.editOrDelete?.toUpperCase()}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
