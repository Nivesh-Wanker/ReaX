import React from "react";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form className="settings-form">
        <label>
          Change Name:
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Change Email:
          <input type="email" placeholder="Your email" />
        </label>
        <label>
          Change Password:
          <input type="password" placeholder="New password" />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;