import "./SignUp.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { RegisterUser } from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { extractToken } from "../../utils/auth";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirm, setConfirm] = useState("");
  const [fieldsTouched, setFieldsTouched] = useState({});
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) navigate("/user/dashboard");
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <div>Loading…</div>;

  const allowedDomains = [
    "gmail.com", "yahoo.com", "outlook.com",
    "icloud.com", "organization.org", "ucf.edu"
  ];

  const isValidEmail = (email) => {
    const match = email.match(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    return match && allowedDomains.includes(match[1].toLowerCase());
  };

  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name.trim());

  const passwordRules = (p) => ({
    minLen: p.length >= 8,
    upper: /[A-Z]/.test(p),
    lower: /[a-z]/.test(p),
    num: /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p),
  });

  const pwdChecks = passwordRules(form.password);
  const pwdStrong = Object.values(pwdChecks).every(Boolean);
  const pwMatch = form.password === confirm;
  const emailValid = isValidEmail(form.email);
  const nameValid = isValidName(form.name);
  const formValid = pwdStrong && pwMatch && emailValid && nameValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") setConfirm(value);
    else setForm((prev) => ({ ...prev, [name]: value }));

    setFieldsTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "email") setEmailError("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      setError("Please correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await RegisterUser(form);
      const token = extractToken(response.headers);
      const user = response.data.user;

      if (token && user) {
        login({ token, user });
        navigate("/user/dashboard");
      } else {
        setError("Missing token or user data from server.");
      }
    } catch (err) {
      const { status, data } = err.response || {};
      if (status === 409 || data?.message?.includes("duplicate")) {
        setEmailError("This email is already registered.");
      } else {
        setError(data?.message || "Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {fieldsTouched.name && !nameValid && (
          <p className="signup-error">Name can’t contain numbers or symbols</p>
        )}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {emailError && <p className="signup-error">{emailError}</p>}
        {fieldsTouched.email && !emailError && !emailValid && (
          <p className="signup-error">Enter a valid email address</p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {fieldsTouched.password && (
          <div className="password-rules">
            <p className={pwdChecks.minLen ? "valid" : "invalid"}>• At least 8 characters</p>
            <p className={pwdChecks.upper ? "valid" : "invalid"}>• One uppercase letter</p>
            <p className={pwdChecks.lower ? "valid" : "invalid"}>• One lowercase letter</p>
            <p className={pwdChecks.num ? "valid" : "invalid"}>• One number</p>
            <p className={pwdChecks.special ? "valid" : "invalid"}>• One special character</p>
          </div>
        )}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-type Password"
          value={confirm}
          onChange={handleChange}
          required
        />
        {fieldsTouched.confirmPassword && !pwMatch && (
          <p className="signup-error">Passwords do not match</p>
        )}
        {error && <p className="signup-error">{error}</p>}
        <button type="submit" disabled={isSubmitting || !formValid}>
          {isSubmitting ? "Creating…" : "Sign Up"}
        </button>
        <p className="signup-note">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}
