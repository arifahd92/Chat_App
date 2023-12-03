// MyModal.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MyForm from "./MyForm";

const FormModal = ({ modalStaus, setModalStatus }) => {
  //const [modalShow, setModalShow] = useState(modalStaus);

  return (
    <Modal show={modalStaus} onHide={() => setModalStatus(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>My Form Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Create Group</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
