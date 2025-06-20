import "./SignIn.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoginUser } from "../../services/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import { extractToken } from "../../utils/auth.js";

function SignIn() {
  /* ---------------------------- state ---------------------------------- */
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [fieldsTouched, setFieldsTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  /* ------------------- logout when visited this page ------------------- */
  useEffect(() => {
    logout(); // auto-logout on visiting this page
  }, []);
  /* --------------------------------------------------------------------- */

  /* --------------------------- handlers -------------------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFieldsTouched({ ...fieldsTouched, [name]: true });
  };

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "icloud.com",
    "organization.org",
    "ucf.edu"
  ];
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = email.match(emailRegex);
    if (!match) return false;
    const domain = match[1].toLowerCase();
    return allowedDomains.includes(domain);
  };

  const emailFormatValid = isValidEmail(formValues.email);
  const passwordPresent  = formValues.password.length > 0;
  const isFormValid      = emailFormatValid && passwordPresent;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setSubmitError("Please fill in all fields correctly.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await LoginUser(formValues); // <- API call
      const token = extractToken(response.headers);
      const user = response.data.user;
      
      ///// Debugging messages//////////
      console.log(response, "response");
      console.log(token, "token");
      console.log(user,"user details");
      ///////////////////////////////////

      if (token && user) {
        login({ token, user });
        navigate("/user/dashboard");
      } else {
        if (!user) {
          setSubmitError("User information missing from server.");
          return;
        }
        setSubmitError("Missing authentication token from server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError(
        error?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* --------------------------- JSX ------------------------------------- */
  return (
    <div className="signin-container">
      <h2>Sign In</h2>

      <form className="signin-form" onSubmit={handleFormSubmit}>
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          required
          autoFocus
        />
        {fieldsTouched.email && !emailFormatValid && (
          <p className="signin-error">Enter a valid email address</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.password && !passwordPresent && (
          <p className="signin-error">Password cannot be empty</p>
        )}

        {/* Form-level error */}
        {submitError && <p className="signin-error">{submitError}</p>}

        <button type="submit" disabled={isSubmitting || !isFormValid}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        <p className="signin-note">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
