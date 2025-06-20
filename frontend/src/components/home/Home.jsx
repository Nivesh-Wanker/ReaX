import React, { useEffect } from "react";
import "./Home.css";
import { useAuth } from "../../hooks/useAuth";

function Home() {
  const {logout} = useAuth();
  /* ------------------- logout when visited this page ------------------- */
  useEffect(() => {
    logout(); // auto-logout on visiting this page
  }, []);
  /* --------------------------------------------------------------------- */
  
  return (
    <div className="home-container">
      <h1>Welcome to ReaX</h1>
      <p>Build modern apps faster with our tools and platform.</p>
      <button className="get-started-btn">Get Started</button>
    </div>
  );
}

export default Home;