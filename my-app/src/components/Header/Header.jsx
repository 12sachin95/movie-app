import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ user, setUser }) => {
  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
    setUser(null);
    // fetch("/auth/logout", {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    // })
    //   .then((response) => {
    //     if (response.status === 200) return response.json();
    //     throw new Error("authentication has been failed!");
    //   })
    //   .then((resObject) => {
    //     setUser(null);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // setUser(null);
    //     // navigate("/login");
    //   });
  };
  return (
    <div className="main_div">
      <div className="container">
        <Link to="/" className="link">
          <h1>Movie app</h1>
        </Link>
        {user ? (
          <ul className="list">
            <li className="listItem">
              {/* <img src={user.photos?.[0]?.value} alt="" className="avatar" /> */}
            </li>
            <li className="listItem">{user.displayName}</li>
            <li
              className="listItem"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        ) : (
          <Link className="link" to="login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
