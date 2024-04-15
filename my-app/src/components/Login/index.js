import React, { useState } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router";
import axios from "axios";

// Run only on initial render

// const LoginButton = () => {
//   const handleLoginClick = () => {
//     const redirectUri = "http://localhost:8080/auth/google/callback"; // Replace with your callback URL
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=260549226857-2kauedevhediellcf16ufdag38vhbc6l.apps.googleusercontent.com&redirect_uri=${redirectUri}&scope=profile+email&response_type=code`;
//     window.location.href = url;
//   };

//   return <button onClick={handleLoginClick}>Login with Google</button>;
// };

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
          <div className="w-full text-center my-2">
            <button onClick={() => handleGoogle()}>Sign in with Google</button>
          </div>
          {/* <LoginButton /> */}
        </div>
      </div>
    </>
  );
};

export default Login;
