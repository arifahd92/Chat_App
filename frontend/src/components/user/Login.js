import React, { useEffect, useState } from "react";

import {
  EnvelopeFill,
  EyeFill,
  EyeSlashFill,
  LockFill,
} from "react-bootstrap-icons"; // Import Bootstrap Icons
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/chatapp");
    }
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );

      if (response.status !== 200) {
        alert("Something went wrong");
        return;
      }
      console.log(response);
      const { token, userName } = response.data;
      //const name = response.data.userName;
      const userId = response.data.userId.toString();
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", userName);
      alert("success");
      setFormData({ email: "", password: "" });
      navigate(`/chatapp`);
    } catch (err) {
      //response object will be stored in err variable of catch
      if (err.response) {
        console.log(err.response.data.error);
        alert(err.response.data.error);
        return;
      }
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="container mt-5 d-flex justify-content-center">
        <h2 className="text-secondary">Login</h2>
      </div>
      <div className="container mt-3  ">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-lg-8  col-xl-6 offset-xl-3 offset-lg-2 text-secondary">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <div class="input-group">
                  <span className="input-group-text" id="email-prepend">
                    <EnvelopeFill />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="email-prepend"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="input-group">
                  <span className="input-group-text" id="email-prepend">
                    <LockFill />
                  </span>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <span
                    className="input-group-text"
                    id="email-prepend"
                    onClick={handleTogglePassword}>
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </span>
                </div>
              </div>
              <div className="d-flex  justify-content-around text-primary">
                <div
                  className="signup  border-bottom  cursor-pointer"
                  onClick={() => navigate("/register")}>
                  Not registered yet?
                </div>
                <div
                  className="signup  border-bottom  cursor-pointer"
                  onClick={() => navigate("/password/forgot")}>
                  Forgot password?
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-4 w-100 ">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
