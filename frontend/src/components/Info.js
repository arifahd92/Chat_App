import React, { useState } from "react";

const Info = () => {
  const [showModal, setShowModal] = useState(true);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      className="modal show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Company Info</h5>
          </div>
          <div className="modal-body">
            <p>
              <strong>Company:</strong> Geeksynergy Technologies Pvt Ltd
            </p>
            <p>
              <strong>Address:</strong> Sanjayanagar, Bengaluru-56
            </p>
            <p>
              <strong>Phone:</strong> XXXXXXXXX09
            </p>
            <p>
              <strong>Email:</strong> XXXXXX@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
