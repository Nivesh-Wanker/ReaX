import React, { useState } from "react";
import "./SignUp.css";
import {RegisterUser} from "../../services/axiosConfig.js"

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateName = (name) =>
    /^[A-Za-z\s]+$/.test(name.trim());


  const passwordValidations = validatePassword(form.password);
  const allPasswordValid = Object.values(passwordValidations).every(Boolean);
  const passwordsMatch = form.password && form.password === form.confirmPassword;
  const emailValid = validateEmail(form.email);
  const nameValid = validateName(form.name);

  const formValid =
    allPasswordValid && passwordsMatch && emailValid && nameValid;


    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formValid) {
    setError("Please fill all fields correctly.");
  } else {
    setError("");

    try {
      const response = await RegisterUser(form);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Something went wrong. Please try again.");
    }
    }
  };


  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {touched.name && !nameValid && (
          <p className="signup-error">Name cannot contain special characters or numbers</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {touched.email && !emailValid && (
          <p className="signup-error">Enter a valid email address</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {touched.password && (
          <div className="password-rules">
            <p className={passwordValidations.minLength ? "valid" : "invalid"}>
              • At least 8 characters
            </p>
            <p className={passwordValidations.upper ? "valid" : "invalid"}>
              • One uppercase letter
            </p>
            <p className={passwordValidations.lower ? "valid" : "invalid"}>
              • One lowercase letter
            </p>
            <p className={passwordValidations.number ? "valid" : "invalid"}>
              • One number
            </p>
            <p className={passwordValidations.special ? "valid" : "invalid"}>
              • One special character (e.g. @, !, #)
            </p>
          </div>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-type Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {touched.confirmPassword && !passwordsMatch && (
          <p className="signup-error">Passwords do not match</p>
        )}

        {error && <p className="signup-error">{error}</p>}

        <button type="submit" disabled={!allPasswordValid || !passwordsMatch}>
          Sign Up
        </button>

        <p className="signup-note">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;