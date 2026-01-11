import { Modal } from "react-bootstrap";

function ConfirmModal({ show, onClose, onConfirm, title, message, confirmText = "Ya", cancelText = "Batal" }) {
  return (
    <Modal show={show} onHide={onClose} centered contentClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn-outline-primary" onClick={onClose}>
          {cancelText}
        </button>
        <button className="btn-primary" onClick={onConfirm}>
          {confirmText}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;