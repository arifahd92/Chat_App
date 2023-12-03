import axios from "axios";
import React, { useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import FloatingScreen from "./FloatingScreen";
import { Avatar, AvatarGroup } from "@mui/material";
import FormModal from "../group/FormModal";

const ChatApp = ({ name, id, type, avatar }) => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [user, setUser] = useState("");
  const [allChat, setAllChat] = useState([]);
  const [modalStaus, setModalStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Connect to the server using Socket.io
    const socket = io("http://localhost:4000");
    const name = localStorage.getItem("userName");
    setUser(name);

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
    }, 100);
  }, []);
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
      setChat(" ");
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

  const handleEditClick = (id, index) => {
    // Handle edit action
    // You can perform any logic you need for editing here
    console.log("Edit clicked for message:");
  };

  const handleDeleteClick = (id, index) => {
    // Handle delete action
    // You can perform any logic you need for deleting here
    console.log("Delete clicked for message:");
  };
  return (
    <>
      <div
        className="container-fluid  bg-dark-subtle  -black d-flex flex-column"
        style={{ minHeight: "100vh", boxSizing: "-box" }}>
        <div
          className="row text-center fixed-top bg-warning-subtle "
          style={{ height: "50px" }}>
          <div className="col-auto col-md-4 m-1    text-center  d-flex justify-content-center align-items-center bg-body-tertiary ">
            <FloatingScreen
              modalStaus={modalStaus}
              setModalStatus={setModalStatus}
            />
          </div>
          <div className="col   display-6 d-flex justify-content-center align-items-center">
            {avatar && <Avatar alt="Remy Sharp" src={`${avatar}`} />}{" "}
            {name && name} {!name && "community group"}
          </div>
        </div>

        <div
          className="row shadow  -black  -danger "
          style={{ marginBottom: "60px", marginTop: "48px" }}>
          {allChat.map((item, ind) => {
            return (
              <>
                <div
                  key={item.id}
                  className="col-12  col-md-8 offset-md-4 bg-body-secondary  "
                  onClick={() => handleEditClick(item.id, ind)}
                  onDoubleClick={() => handleDeleteClick(item.id, ind)}>
                  <div
                    className={`card   w-75  mb-2 mt-1 ${
                      item.user.name == user ? "float-end" : "float-start"
                    }`}>
                    <div
                      className={`card-header ${
                        item.user.name == user ? "text-primary" : ""
                      }`}>
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
        <div className="row fixed-bottom  bg-body-secondary  p-2 ">
          {/* Fixed Input Box at the Bottom */}

          <div className="col-12 col-md-8 offset-md-4">
            <div className="cont  -danger p2 bg-primary-subtle">
              <div className="input-group" style={{ height: "50px" }}>
                <input
                  type="text"
                  className="form-control bg  bg-danger-subtle "
                  placeholder="Type here..."
                  onChange={(e) => setChat(e.target.value)}
                  value={chat}
                />
                <button
                  style={{ width: "50px" }}
                  onClick={hanndleSendMessage}
                  className="btn btn-danger  -black"
                  type="button">
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormModal modalStaus={modalStaus} setModalStatus={setModalStatus} />
    </>
  );
};

export default ChatApp;
