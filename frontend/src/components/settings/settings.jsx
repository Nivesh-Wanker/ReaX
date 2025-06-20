import React, { useState, useEffect } from "react";
import "./Settings.css";
import { useAuth } from "../../hooks/useAuth";
import { ChangeUserDetails } from "../../services/axiosConfig";

function Settings() {
  const { user, token, login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "" // blank for security
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
  
    try {
      const response = await ChangeUserDetails(formData, token); 
      const updatedUser = response.data.user;
  
      login({ token, user: updatedUser }); // retain token
      setMessage("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Change Name:
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Change Email:
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Change Password:
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        {message && <p className="settings-message">{message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Settings;