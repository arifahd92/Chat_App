// MyForm.js
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    // Define your form fields here
    firstName: "",
    lastName: "",
    email: "",
  });
  // State to track selected items
  const [selectedIds, setSelectedIds] = useState([]);

  // Your list of items
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Function to handle button click
  const handleButtonClick = () => {
    console.log("Selected Items:", selectedIds);
  };
  const handleChange = (e) => {
    // Update form data when input values change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
    // You can send the form data to the server or perform any other actions
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Group Name "
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
          {userList.map((item, index) => (
            <li key={item.id} className="list-group-item">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item.id)}
                checked={selectedIds.includes(item.id)}
              />
              {item.name}({item.email})
            </li>
          ))}
        </ul>
      </form>
      <button onClick={handleButtonClick}>print ids of selected users</button>
    </>
  );
};

export default MyForm;
