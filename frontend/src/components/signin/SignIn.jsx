import React, { useState } from "react";
import "./SignIn.css";
import { LoginUser } from "../../services/axiosConfig.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await LoginUser(form);
      console.log("Success:", response.data);
      // TODO: Store auth token if returned (e.g. localStorage.setItem)
      navigate("/dashboard"); // or wherever post-login route is
    } catch (error) {
      console.error("Error while logging in:", error);
      setError(
        error?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoFocus
          aria-label="Email address"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          aria-label="Password"
        />

        {error && <p className="signin-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="signin-note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
