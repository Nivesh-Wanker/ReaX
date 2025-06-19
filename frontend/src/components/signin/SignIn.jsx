import React from "react";
import "./SignIn.css";

function SignIn() {
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
        <p className="signin-note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;