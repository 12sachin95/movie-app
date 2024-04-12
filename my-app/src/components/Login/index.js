import React from "react";
import "./login.css";

const Login = () => {
  const handleGoogle = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form">
            <input type="text" name="" id="" placeholder="username" />
            <input type="password" name="" id="" placeholder="password" />
            <button>Login</button>
            <p className="message">
              Not Registerd? <a href="#">Create an account</a>
            </p>
          </form>
          <div className="w-full text-center my-3">Or</div>
          <div className="w-full text-center">
            <div
              style={{ color: "#000", cursor: "pointer" }}
              onClick={() => handleGoogle()}
            >
              Sign in with Google 2
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
