import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const handleCreateForm = () => {
    navigate("/user/createform");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <button className="create-form-btn" onClick={handleCreateForm}>
          + Create New Form
        </button>
      </div>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Forms</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Total Responses</h3>
          <p>128</p>
        </div>
        <div className="stat-card">
          <h3>Active Forms</h3>
          <p>2</p>
        </div>
      </div>

      {/* Form Listing */}
      <div className="forms-section">
        <h3>Your Forms</h3>
        <table className="forms-table">
          <thead>
            <tr>
              <th>Form Title</th>
              <th>Status</th>
              <th>Responses</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Event Feedback</td>
              <td>Active</td>
              <td>45</td>
              <td>2025-06-15</td>
              <td>
                <button>View</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;