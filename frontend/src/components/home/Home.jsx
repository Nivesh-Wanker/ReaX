import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && window.location.pathname === "/") {
      navigate("/user/dashboard", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <div>Loading…</div>;

  return (
    <div className="home-container">
      <h1>Welcome to ReaX</h1>
      <p>Build modern apps faster with our tools and platform.</p>
      <button className="get-started-btn" onClick={() => navigate("/signup")}>
        Get Started
      </button>
    </div>
  );
}
