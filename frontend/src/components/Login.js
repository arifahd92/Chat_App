import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login") || false);
    if (login) {
      navigate("/dashboard");
    }
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const user = JSON.parse(localStorage.getItem("user")) || [];
    if (user.length === 0) {
      alert("invalid credentials");
      return;
    }
    const name = formData.name;
    let index = -1;
    for (let i = 0; i < user.length; i++) {
      if (user[i].name === name) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      alert("invalid credentials");
      return;
    }

    if (user[index].password === formData.password) {
      alert("login successfull");
      localStorage.setItem("login", "true");
      setFormData({
        name: "",
        password: "",
      });
      navigate("/dashboard");
    } else {
      alert("invalid credentials");
      return;
    }
  };
  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <h2 className="text-secondary">Login</h2>
      </div>
      <div className="container mt-3  ">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-lg-8  col-xl-6 offset-xl-3 offset-lg-2 text-secondary">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  required
                  type="name"
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
                      className="btn btn-outline-none"
                      type="button"
                      onClick={handleTogglePassword}>
                      {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex  justify-content-center text-primary">
                <div
                  className="signup  border-bottom  cursor-pointer"
                  onClick={() => navigate("/signup")}>
                  Not registered yet?
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-4 w-100 ">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
