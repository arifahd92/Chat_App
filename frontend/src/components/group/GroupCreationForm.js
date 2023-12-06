// GroupCreationForm.js
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../store/chat-context";

const GroupCreationForm = () => {
  // Your list of items
  const [userList, setUserList] = useState([]);
  const [request, setRequest] = useState(false);
  const { input, memberIds, handleInputChange, handleCheckboxChange } =
    useContext(ChatContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRequest(true);
        console.log("create a group my form, fetchdata called");
        const token = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:4000/user", {
          headers: {
            Authorization: token,
          },
        });
        console.log("users");
        console.log(response.data);
        setUserList(response.data);
        setRequest(false);
      } catch (error) {
        console.log(error);
        alert(error.message);
        setRequest(false);
      }
    };

    // Call the function
    fetchData();
  }, []);

  return (
    <>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="groupName"
            name="groupName"
            value={input.groupName}
            onChange={(e) => handleInputChange(e)}
            placeholder="Group Name "
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="description"
            value={input.description}
            onChange={handleInputChange}
            placeholder="Group Description"
          />
        </div>
        <div>Select users to add in group</div>
        <ul
          className="list-group"
          style={{
            maxHeight: "300px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}>
          {!request &&
            userList.map((item, index) => (
              <li key={item.id} className="list-group-item">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item.id)}
                  checked={memberIds.includes(item.id)}
                />
                {item.name}({item.email})
              </li>
            ))}
          {request && <div>Loading...</div>}
        </ul>
      </form>
    </>
  );
};

export default GroupCreationForm;
