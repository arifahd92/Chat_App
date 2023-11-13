import React, { useEffect, useState } from "react";
import { SendExclamation } from "react-bootstrap-icons";
import io from "socket.io-client";

const ChatApp = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Connect to the server using Socket.io
    const socket = io("http://localhost:4000");
    const name = localStorage.getItem("userName");

    // Emit the "new-user-joined" event only if the user is not already in the list
    if (!users.includes(name)) {
      socket.emit("new-user-joined", name);
    }

    socket.on("user-joined", (newUser) => {
      // Update the list of users only if the user is not already in the list
      if (!users.includes(newUser)) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        console.log(`${newUser} joined chat`);
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [users]); // Run this effect whenever the list of users changes

  return (
    <>
      <div
        className="container  bg-dark-subtle border border-black d-flex flex-column"
        style={{ minHeight: "100vh", boxSizing: "border-box" }}>
        <div className="row text-center">
          <h1>Chat App</h1>
        </div>
        <div className="row flex-grow-1">
          {/* Scrollable List at the Top */}
          <div className="col-md-12 scrollable-list overflow-auto">
            {/* Your scrollable list content goes here */}
            <ul className="list-group">
              {users.map((item, index) => {
                return (
                  <>
                    <li className="list-group-item m-2 text-center" key={index}>
                      {item} joined the chat
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="container border border-danger d-flex justify-content-center align-items-end"
        style={{ position: "fixed", bottom: "0px", left: "100px" }}>
        <div className="row w-100 border border-black">
          {/* Fixed Input Box at the Bottom */}
          <div className="col-12">
            <div className="input-group">
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

export default ChatApp;
