import "./SignIn.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoginUser } from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { extractToken } from "../../utils/auth";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldsTouched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/user/dashboard");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <div>Loading…</div>;

  const allowedDomains = [
    "gmail.com", "yahoo.com", "outlook.com",
    "icloud.com", "organization.org", "ucf.edu"
  ];

  const isValidEmail = (email) => {
    const m = email.match(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    return m && allowedDomains.includes(m[1].toLowerCase());
  };

  const emailOk = isValidEmail(form.email);
  const passOk  = form.password.length > 0;
  const formOk  = emailOk && passOk;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formOk) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await LoginUser(form);
      const token = extractToken(res.headers);
      const user  = res.data.user;

      if (token && user) {
        login({ token, user });
        navigate("/user/dashboard");
      } else {
        setError("Missing authentication data from server.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.email && !emailOk && (
          <p className="signin-error">Enter a valid email address</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.password && !passOk && (
          <p className="signin-error">Password cannot be empty</p>
        )}
        {error && <p className="signin-error">{error}</p>}
        <button type="submit" disabled={isSubmitting || !formOk}>
          {isSubmitting ? "Signing In…" : "Sign In"}
        </button>
        <p className="signin-note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
