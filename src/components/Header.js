import React from "react";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";


function Header() {
  
  return (
    <AppBar className="header">
      <Toolbar className="container">
       <Link to ="/" className="link"> <Typography>HOME</Typography></Link>
        <Typography>CONTACT</Typography>
        <Typography>ABOUT</Typography>
        <Link to="/login"style={{textDecoration:"none",color:"inherit"}}><Typography>LOGIN</Typography></Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
