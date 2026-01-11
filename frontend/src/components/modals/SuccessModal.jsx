import { Modal } from "react-bootstrap";

function SuccessModal({ show, onClose, title, message }) {
  return (
    <Modal show={show} onHide={onClose} centered contentClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn-primary" onClick={onClose}>
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;