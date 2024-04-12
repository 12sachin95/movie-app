import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../Login/login.css";

const validateEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError("Please fill all the fields");
    } else {
      const isValid = validateEmail(email);
      if (!isValid) {
        setError("Please enter a valid email address");
        return;
      }
      console.log("===formData", formData);
    }
  };

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((previews) => ({ ...previews, [name]: value }));
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>SignUp</h1>
        <div className="form">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
            />
            <input
              onChange={handleChange}
              type="text"
              name="email"
              id="email"
              placeholder="email"
              required
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
            {error && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
            <button type="submit">SignUp</button>
            <p className="message">
              Allready have a account?{" "}
              <span
                style={{ cursor: "pointer", color: "#4caf50" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
