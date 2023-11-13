import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { SendExclamation, Whatsapp } from "react-bootstrap-icons";
//import "./App.css"; // Import your custom CSS file for additional styling if needed

const ChatUI = () => {
  return (
    <>
      <div
        className="container  bg-dark-subtle border border-black"
        style={{ minHeight: "100vh", boxSizing: "border-box" }}>
        <div className="row text-center">
          <h1>Chat App</h1>
        </div>
        <div className="row">
          {/* Scrollable List at the Top */}
          <div className="col-md-12 scrollable-list overflow-auto">
            {/* Your scrollable list content goes here */}
            <ul className="list-group">
              <li className="list-group-item">Item 1</li>
              <li className="list-group-item">Item 2</li>
              <li className="list-group-item">Item 3</li>
              <li className="list-group-item">Item 1</li>
              <li className="list-group-item">Item 2</li>
              <li className="list-group-item">Item 3</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border border-danger  d-flex justify-content-center align-items-center ">
        <div
          className="row  border border-black  "
          style={{ position: "fixed", bottom: "0px" }}>
          {/* Fixed Input Box at the Bottom */}
          <div className="col-12 col-md-9 ">
            <div className="input-group  ">
              <input
                type="text"
                className="form-control bg-body-secondary"
                placeholder="Type here..."
              />

              <button
                className="btn btn-danger border border-black"
                type="button">
                <SendExclamation />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
