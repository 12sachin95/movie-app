import React, { useState } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signin", { username, password });
      console.log("Signin response:", response);

      if (response.data) {
        window.open("/", "_self");
      }
    } catch (error) {
      setError(error.message ?? error);
    }
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="username"
            />
            <input
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            {error && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
            <button>Login</button>
            <p className="message">
              Not Registerd?{" "}
              <span
                style={{ cursor: "pointer", color: "#4caf50" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create an account
              </span>
            </p>
          </form>
          <div className="w-full text-center my-3">Or</div>
          <div className="w-full text-center">
            <div
              style={{ color: "#000", cursor: "pointer" }}
              onClick={() => handleGoogle()}
            >
              Sign in with Google
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
