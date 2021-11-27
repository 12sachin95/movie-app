import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <div className="main_div">
      <div className="container">
        <Link to="/" className="link"><h1>Movie app</h1></Link>
        <h2>
          <i className="far fa-user-circle"></i>User
        </h2>
      </div>
    </div>
  );
};

export default Header;
