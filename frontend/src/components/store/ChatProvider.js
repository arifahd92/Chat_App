import React, { useEffect, useState } from "react";
import { ChatContext } from "./chat-context";
import axios from "axios";

export default function ChatProvider(props) {
  const [memberGroup, setMemberGroup] = useState([]);
  const [adminGroup, setAdminGroup] = useState([]);
  const [allUser, setAllUser] = useState([{}]);
  // State to track selected items
  const [memberIds, setMemberIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [input, setInput]=useState({name:'',})

  const [input, setInput] = useState({
    groupName: "",
    description: "",
  });

  //setToken(localStorage.getItem("userToken")); //

  const fetchAdminGroups = async () => {
    const token = localStorage.getItem("userToken");
    console.log("fetch admin grpoup called withh token");
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/admin-groups", {
        headers: {
          Authorization: token,
        },
      });

      console.log("from fetch all group inside chat provider");

      console.log({ adminGroups: response.data });

      setAdminGroup(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(
        error.message,
        "inside error of fetch all group chat provider"
      );
      setIsLoading(false);
    }
  };
  const fetchAllRegisteredUser = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.get("http://localhost:4000/user", {
        headers: {
          Authorization: token,
        },
      });
      console.log({ alluser: response.data });
      setAllUser(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  function handleInputChange(e) {
    let name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  }
  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (memberIds.includes(id)) {
      setMemberIds(memberIds.filter((selectedId) => selectedId !== id));
    } else {
      setMemberIds([...memberIds, id]);
    }
  };
  async function createGroup() {
    const token = localStorage.getItem("userToken");
    console.log({ token });
    console.log({ memberGroup });
    console.log({
      ...input,
      memberIds,
    });
    if (!input.groupName) {
      alert("group name is required");
      return;
    }
    if (input.groupName.length > 15) {
      alert("Group name can't be greater than 15 character");
      return;
    }
    if (!memberIds.length) {
      alert("Select atleast one friend to create group");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/create-group",
        {
          ...input,
          memberIds,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status == 201) {
        alert("group creation success");
        console.log(response.data);
      }
      setMemberGroup([response.data, ...adminGroup]);
      setInput({ groupName: "", description: "" });
      setMemberIds([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      alert(error.message);
    }
  }
  const fetchMemberGroups = async () => {
    const token = localStorage.getItem("userToken");
    console.log("fetch member group called withh token");
    try {
      setIsLoading(true);

      const response = await axios.get("http://localhost:4000/member-groups", {
        headers: {
          Authorization: token,
        },
      });

      console.log("from fetch member group inside chat provider");
      console.log({ memberGroups: response.data });

      setIsLoading(false);
      setMemberGroup(response.data);
    } catch (error) {
      console.log(
        error.message,
        "inside error of fetch all group chat provider"
      );
      setIsLoading(false);
    }
  };
  async function deleteGroup() {}
  return (
    <div>
      <ChatContext.Provider
        value={{
          input,
          memberGroup,
          adminGroup,
          createGroup,
          deleteGroup,
          handleInputChange,
          handleCheckboxChange,
          memberIds,
          isLoading,
          allUser,
          fetchAdminGroups,
          fetchMemberGroups,
          fetchAllRegisteredUser,
        }}>
        {props.children}
      </ChatContext.Provider>
    </div>
  );
}
//CounterProvider ko app me use karenge
