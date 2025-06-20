import React from "react";
import "./Profile.css";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  console.log("User details:", user);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name.toUpperCase()}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.admin ? "Admin" : "User"}</p>
      </div>
    </div>
  );
}

export default Profile;