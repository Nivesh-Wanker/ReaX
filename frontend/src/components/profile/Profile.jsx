import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> Rachitha Challa</p>
        <p><strong>Email:</strong> rachitha@example.com</p>
        <p><strong>Role:</strong> Developer</p>
      </div>
    </div>
  );
}

export default Profile;