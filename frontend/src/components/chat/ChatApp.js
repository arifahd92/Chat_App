import axios from "axios";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import FloatingScreen from "./FloatingScreen";
import { Avatar, AvatarGroup } from "@mui/material";
const  FormModal = lazy(()=>import("../group/FormModal")) ;
const ChatApp = ({ name, id, type, avatar }) => {
  const [chat, setChat] = useState(""); //input values
  const [user, setUser] = useState(localStorage.getItem("userName"));
  const [allChat, setAllChat] = useState([]);
  const [modalStaus, setModalStatus] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedInId, setLoggedInId] = useState("");
  const navigate = useNavigate();
  const socket = io("http://localhost:4000");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("userName"));
    setLoggedInId(localStorage.getItem("userId"));
    getCommunityChat();
    // join a private roop followed by you userId
    socket.emit("join-private-room", localStorage.getItem("userId"));
    // Cleanup function to remove Socket.IO event listeners when component unmounts
  }, []);
  useEffect(() => {
    console.log("useEffect of receiving message called*********************");
    if (type === "user") {
      socket.on("private-message", (data) => {
        console.log(
          "from socket io ****************************************************"
        );
        console.log(data.receiver.id, { "receipent id": id });
        if (data.receiver.id == id) {
          setAllChat((prevChat) => [
            ...prevChat,
            {
              ...data.message,
              Sender: { id: data.receiver.id, name: data.receiver.name },
            },
          ]);
        }
      });
    }
  }, [id, type, allChat]);

  useEffect(() => {
    console.log("useEffect of chat app called");
    if (type === "user") {
      console.log("inside type user=true");
      getUserChat({ id });
    } else if (type === "group") {
      getGroupChat({ id });
    } else {
      console.log("type didnt match");
    }
  }, [id, type]);

  async function getUserChat(obj) {
    try {
      const token = localStorage.getItem("userToken");
      const userName = localStorage.getItem("userName");
      const response = await axios.get(
        `http://localhost:4000/user/message/${obj.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;

      console.log({ userData: data });
      setAllChat(data);
      setUser(userName);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  async function getGroupChat(obj) {
    try {
      console.log("get groupchat called");
      const token = localStorage.getItem("userToken");
      const userName = localStorage.getItem("userName");
      const response = await axios.get(
        `http://localhost:4000/group/message/${obj.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;

      console.log({ data });
      setAllChat(data);
      setUser(userName);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  //postGroupChat********************
  const postGroupChat = async () => {
    if (!chat) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `http://localhost:4000/group/message/${id}`,
        { text: chat },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ status: response.status });
      console.log("data on user posting message");
      const data = response.data;
      console.log(response.data);
      setChat(" ");
      setAllChat([
        ...allChat,
        { ...data, Sender: { id: loggedInId, name: loggedInUser } },
      ]);
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
  const postUserChat = async () => {
    if (!chat) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `http://localhost:4000/user/message/${id}`,
        { text: chat },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ status: response.status });
      console.log("data on user posting message");
      const data = response.data;
      console.log(response.data);
      setChat(" ");
      setAllChat([
        ...allChat,
        { ...data, Sender: { id: loggedInId, name: loggedInUser } },
      ]);
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
  const postCommunityChat = async () => {
    if (!chat) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `http://localhost:4000/common-message`,
        { text: chat },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ status: response.status });
      console.log("data on user posting message");
      const data = response.data;
      console.log(response.data);
      setChat(" ");
      setAllChat([
        ...allChat,
        { ...data, Sender: { id: loggedInId, name: loggedInUser } },
      ]);
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
  const getCommunityChat = async () => {
    const token = localStorage.getItem("userToken");
    console.log("get community cat called");
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://localhost:4000/common-message`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ status: response.status });
      console.log("");
      const data = response.data;
      console.log(response.data);
      setChat(" ");
      setAllChat(response.data);
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
  const hanndleSendMessage = async () => {
    if (type == "user") {
      postUserChat();
    } else if (type == "group") {
      postGroupChat();
    } else {
      postCommunityChat();
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
  const handleLogOut = () => {
    const sure = window.confirm("Are you sure");
    if (sure) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      navigate("/");
    } else {
      return;
    }
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
          <div className="col    d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div>
                {avatar && <Avatar alt="Remy Sharp" src={`${avatar}`} />}{" "}
              </div>{" "}
              <div className="ms-1 lead">
                {name && name} {!name && "community group"}
              </div>
            </div>

            <div>
              <button
                className="btn btn-outline-danger me-2"
                onClick={handleLogOut}>
                LogOut
              </button>
            </div>
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
                      item?.Sender?.name == user ? "float-end" : "float-start"
                    }`}>
                    <div
                      className={`card-header ${
                        item?.Sender?.name == user ? "text-primary" : ""
                      }`}>
                      <span className="">
                        {item?.Sender?.name == user
                          ? "You"
                          : item?.Sender?.name}
                      </span>{" "}
                      <span className="text float-end">
                        {extractDate(item.createdAt)}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="card-text">{item.text}</div>
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
      <Suspense fallback={<div>loading...</div>}>
      <FormModal modalStaus={modalStaus} setModalStatus={setModalStatus} />
      </Suspense>
    </>
  );
};

export default ChatApp;
