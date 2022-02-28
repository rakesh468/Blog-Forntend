import React from "react";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar className="header">
      <Toolbar className="container">
        <Link to="/" className="link">HOME</Link>
        <Link to="/blogs" className="link">
          {" "}
          BLOGS
        </Link>
       <Link to="/about" className="link">
          ABOUT
        </Link>
        <Link to="/login" className="link">
          LOGIN
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
