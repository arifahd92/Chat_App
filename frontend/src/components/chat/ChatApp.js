import axios from "axios";
import React, { useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import FloatingScreen from "./ChatUI";

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [user, setUser] = useState("");
  const [allChat, setAllChat] = useState([]);
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
  //get messages
  useEffect(() => {
    setTimeout(async () => {
      const token = localStorage.getItem("userToken");
      const userName = localStorage.getItem("userName");
      const response = await axios.get("http://localhost:4000/common-message", {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;

      console.log(data);
      setAllChat(data);
      setUser(userName);
    }, 10000);
  }, [allChat]);
  const hanndleSendMessage = async () => {
    if (!chat) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:4000/common-message",
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
  // extract date
  const extractDate = (timestampString) => {
    const timestamp = new Date(timestampString);

    // Get UTC year, month, and day
    const yearUTC = timestamp.getUTCFullYear();
    const monthUTC = timestamp.getUTCMonth() + 1; // Months are zero-based, so add 1
    const dayUTC = timestamp.getUTCDate();

    // Format the UTC date
    const formattedUTCDate = `${yearUTC}-${
      monthUTC < 10 ? "0" + monthUTC : monthUTC
    }-${dayUTC < 10 ? "0" + dayUTC : dayUTC}`;

    console.log(formattedUTCDate);
    return formattedUTCDate;
  };
  // extract time
  const extractTime = (timestampString) => {
    // const timestampString = "2023-11-13T18:58:38.241Z";
    const timestamp = new Date(timestampString);

    // Get hours, minutes, and seconds
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();

    // Format the time
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleListItemClick = (message) => {
    // Set the selected message and show options div
    // setSelectedMessage(message);
    //setShowOptions(true);
  };

  const handleEditClick = () => {
    // Handle edit action
    // You can perform any logic you need for editing here
    console.log("Edit clicked for message:");
  };

  const handleDeleteClick = () => {
    // Handle delete action
    // You can perform any logic you need for deleting here
    console.log("Delete clicked for message:");
  };
  return (
    <>
      <div
        className="container  bg-dark-subtle border border-black d-flex flex-column"
        style={{ minHeight: "100vh", boxSizing: "border-box" }}>
        <div className="row text-center">
          <FloatingScreen />
          <h1>Chat App</h1>
        </div>

        <div className="row mb-5 shadow border border-black ">
          <div className="heading bg-body-secondary bg-secondary border border-danger-subtle">
            <div className="">groupe name</div>
          </div>
          {allChat.map((item) => {
            return (
              <>
                <div key={item.id} className="col-12 ">
                  <div
                    className={`card   w-75  mb-2 ${
                      item.user.name == user ? "float-end" : "float-start"
                    }`}>
                    <div className="card-header">
                      <strong>{item.user.name}</strong>{" "}
                      <span className="text float-end">
                        {extractDate(item.createdAt)}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="card-text">{item.commonMessage}</div>
                      <div className="  text-end">
                        {" "}
                        {extractTime(item.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
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
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
