import React from "react";
import "../Login/login.css";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const handleGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>SignUp</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" name="" id="" placeholder="username" />
            <input type="text" name="" id="" placeholder="email" />
            <input type="text" name="" id="" placeholder="image" />
            <input type="password" name="" id="" placeholder="password" />
            <button>SignUp</button>
            <p className="message">
              Allready have a account{" "}
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
