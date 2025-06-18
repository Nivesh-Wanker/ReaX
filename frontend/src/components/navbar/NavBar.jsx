<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";

const isLoggedIn = false; 

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

>>>>>>> 817b1690b2b37cddb9bab7625dbd3edc35ceebc3
  return (
    <nav className="navbar">
      <div className="navbar-logo">ReaX</div>
      <div className="navbar-buttons">
<<<<<<< HEAD
        <Link to="/signin" className="nav-btn">Sign In</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
=======
        {isLoggedIn ? (
          <div className="account-dropdown">
          <FaUserCircle
            size={28}
            className="nav-icon"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <Link to="/logout" className="dropdown-item">Logout</Link>
            </div>
          )}
        </div>
        ) : (<>
        <Link to="/signin" className="nav-btn">Sign In</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
        </>)}
>>>>>>> 817b1690b2b37cddb9bab7625dbd3edc35ceebc3
      </div>
    </nav>
  );
}

export default Navbar;