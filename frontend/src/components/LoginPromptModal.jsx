import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPromptModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Akses Terbatas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Anda harus login atau mendaftar untuk melanjutkan tindakan ini (misalnya: membuat, menyimpan, atau menyukai konten).</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-secondary" onClick={handleClose}>
          Tutup
        </button>
        <button className="btn-primary" onClick={handleRedirectToLogin}>
          Login Sekarang
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginPromptModal;