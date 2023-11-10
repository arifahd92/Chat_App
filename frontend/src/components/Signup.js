import React, { useState } from "react";

import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    profession: "",
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    user.push(formData);
    localStorage.setItem("user", JSON.stringify(user));
    alert("success");
    setFormData({
      name: "",
      password: "",
      email: "",
      phone: "",
      profession: "",
    });
    navigate("/");
  };
  return (
    <div className="mainContainer">
      <div className="container mt-5 d-flex justify-content-center ">
        <h2 className="text-secondary">Signup</h2>
      </div>
      <div className="container mt-3  ">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-lg-8  col-xl-6 offset-xl-3 offset-lg-2 text-secondary">
            <form onSubmit={handleSubmit} className="">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="input-group">
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
                  <div className="input-group-append border bg-white">
                    <button
                      className="btn btn-outline-none "
                      type="button"
                      onClick={handleTogglePassword}>
                      {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">phone:</label>
                <input
                  required
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleSelect" className="form-label">
                  Select an option:
                </label>
                <select
                  required
                  className="form-select"
                  id="category"
                  name="profession"
                  onChange={handleChange}
                  value={formData.profession}>
                  <option disabled value="">
                    Select profession
                  </option>
                  <option value="Groccery">Software Engineer</option>
                  <option value="Rent">Doctor</option>
                  <option value="Shopping">Teacher</option>
                  <option value="Movie">Accountant</option>
                </select>
              </div>
              <div className="d-flex justify-content-center text-primary">
                <div
                  className="signup  border-bottom  cursor-pointer"
                  onClick={() => navigate("/")}>
                  Already registered? Login
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4 w-100 ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
