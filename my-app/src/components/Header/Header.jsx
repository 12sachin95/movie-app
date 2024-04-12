import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
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
