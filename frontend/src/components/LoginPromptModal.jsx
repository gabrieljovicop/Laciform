import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPromptModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Akses Terbatas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Anda harus login atau mendaftar untuk melanjutkan tindakan ini (misalnya: membuat, menyimpan, atau menyukai konten).</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        <Button variant="primary" onClick={handleRedirectToLogin}>
          Login Sekarang
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginPromptModal;