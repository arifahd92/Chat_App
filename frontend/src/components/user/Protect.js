import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ Component }) => {
  //const [request, setRequest] = useState(true);
  const navigate = useNavigate();
  const authorize = async (token) => {
    try {
      console.log("authorize called");
      // setRequest(true);
      const response = await axios.get("http://localhost:4000/authorization", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log("request complete");
      const data = response.data;
      // setRequest(false);
      console.log("protect", data);
      if (data.message !== "success") {
        navigate("/");
      }
    } catch (error) {
      console.error("inside error");
      //setRequest(false);
      if (error.response) {
        console.log(error.response.request.status);
        if (error.response.request.status === 401) {
          localStorage.removeItem("userToken");
          alert("unauthorized access");
          navigate("/");
          return;
        }
      }
      alert(error.message);
    } finally {
      console.log("finally got called");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      authorize(token);
    } else {
      navigate("/");
    }
  }, []);

  return <>{<Component />}</>;
};
export default Protect;
