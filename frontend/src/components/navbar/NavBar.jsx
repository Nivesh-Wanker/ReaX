import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ReaX</div>
      <div className="navbar-buttons">
        <Link to="/signin" className="nav-btn">Sign In</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;