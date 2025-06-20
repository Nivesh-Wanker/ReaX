import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/user/dashboard" : "/"} className="navbar-logo">
        ReaX
      </Link>

      <div className="navbar-buttons">
        {isAuthenticated ? (
          <div className="navbar-user-wrapper">
            <div className="navbar-user" onClick={() => setOpen(!open)}>
              <span className="user-name">Hi {user?.name}</span>
              <FaUserCircle size={28} className="user-icon" />
            </div>
            {open && (
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/user/profile">Profile</Link>
                <Link className="dropdown-item" to="/user/settings">Settings</Link>
                <Link className="dropdown-item" to="/user/logout">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="nav-btn" to="/signin">Sign In</Link>
            <Link className="nav-btn" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
