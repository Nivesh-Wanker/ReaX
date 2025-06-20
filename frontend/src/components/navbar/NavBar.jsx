import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/user/dashboard" : "/"} className="navbar-logo">ReaX</Link>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          <div className="navbar-user-wrapper">
            <div className="navbar-user" onClick={toggleDropdown}>
              <span className="user-name">Hi {user.name}</span>
              <FaUserCircle size={28} className="user-icon" />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/user/profile" className="dropdown-item">Profile</Link>
                <Link to="/user/settings" className="dropdown-item">Settings</Link>
                <Link to="/user/logout" className="dropdown-item">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="nav-btn">Sign In</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;