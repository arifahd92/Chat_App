import axios from "axios";
import React, { useEffect, useState } from "react";
import { SendExclamation } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const navigate = useNavigate();
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

  const hanndleSendMessage = async () => {
    if (!chat) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:4000/chat",
        { message: chat },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ status: response.status });
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.log(error.response.status);
      if (error.response?.status === 401) {
        alert("token expired login again");
        localStorage.removeItem("userToken");
        navigate("/");
      }
      console.error("Error:", error.message);
    }
  };

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
                onChange={(e) => setChat(e.target.value)}
              />
              <button
                onClick={hanndleSendMessage}
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
