// MyModal.js
import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import GroupCreationForm from "./GroupCreationForm";
import { ChatContext } from "../store/chat-context";

const FormModal = ({ modalStaus, setModalStatus }) => {
  //const [modalShow, setModalShow] = useState(modalStaus);
  const { createGroup } = useContext(ChatContext);

  return (
    <Modal show={modalStaus} onHide={() => setModalStatus(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>My Form Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GroupCreationForm />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => createGroup(localStorage.getItem("userToken"))}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
