import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./SignUp.css";
import { RegisterUser } from "../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { extractToken } from "../../utils/auth";

function SignUp() {
  /* ----------------------- state ----------------------- */
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { logout } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldsTouched, setFieldsTouched] = useState({});
  const [submitError, setSubmitError] = useState("");            
  const [emailError, setEmailError] = useState("");              
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  /* ------------------- logout when visited this page ------------------- */
  useEffect(() => {
    logout(); // auto-logout on visiting this page
  }, []);
  /* --------------------------------------------------------------------- */

  /* ------------------- input handler ------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") setConfirmPassword(value);
    else setFormValues((prev) => ({ ...prev, [name]: value }));

    setFieldsTouched((prev) => ({ ...prev, [name]: true }));
    if (name === "email") setEmailError("");                    
    if (submitError) setSubmitError("");
  };

  /* ------------------- validation ---------------------- */
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
  
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name.trim());
  const passwordRules = (p) => ({
    minLen: p.length >= 8,
    upper: /[A-Z]/.test(p),
    lower: /[a-z]/.test(p),
    num: /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p),
  });

  const pwdChecks      = passwordRules(formValues.password);
  const pwdStrong      = Object.values(pwdChecks).every(Boolean);
  const pwMatch        = formValues.password && formValues.password === confirmPassword;
  const emailValid     = isValidEmail(formValues.email);
  const nameValid      = isValidName(formValues.name);
  const formValid      = pwdStrong && pwMatch && emailValid && nameValid;

  /* ------------------- submit -------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      setSubmitError("Please correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setEmailError("");

    try {
      const response = await RegisterUser(formValues);
      const token = extractToken(response.headers);
      const user = response.data.user;
      
      ///// Debugging messages///////////
      console.log(response, "response");
      console.log(token, "token");
      console.log(user,"user details");
      ///////////////////////////////////
      
      if (token && user) {
        login({ token, user });
        console.log("move to dashboard success");
        navigate("/user/dashboard");
      } else {
        if (!user) {
          setSubmitError("User information missing from server.");
          return;
        }
        setSubmitError("Missing authentication token from server.");
      }
    } catch (err) {
      const { status, data } = err.response || {};
      if (status === 409 || data?.message?.includes("duplicate")) {
        setEmailError("This email is already registered.");
      } else {
        setSubmitError(data?.message || "Something went wrong. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* --------------------- JSX --------------------------- */
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.name && formValues.name && !nameValid && (
          <p className="signup-error">Name can’t contain numbers or symbols</p>
        )}

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {emailError && <p className="signup-error">{emailError}</p>}
        {fieldsTouched.email && !emailError && !emailValid && (
          <p className="signup-error">Enter a valid email address</p>
        )}

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.password && (
          <div className="password-rules">
            <p className={pwdChecks.minLen ? "valid" : "invalid"}>
              • Password must be at least 8 characters long
            </p>
            <p className={pwdChecks.upper ? "valid" : "invalid"}>
              • Must include at least one uppercase letter (A–Z)
            </p>
            <p className={pwdChecks.lower ? "valid" : "invalid"}>
              • Must include at least one lowercase letter (a–z)
            </p>
            <p className={pwdChecks.num ? "valid" : "invalid"}>
              • Must include at least one number (0–9)
            </p>
            <p className={pwdChecks.special ? "valid" : "invalid"}>
              • Must include at least one special character (e.g. @, #, $, !)
            </p>
          </div>
        )}


        {/* Confirm Password */}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-type Password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.confirmPassword && !pwMatch && (
          <p className="signup-error">Passwords do not match</p>
        )}

        {submitError && <p className="signup-error">{submitError}</p>}

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

export default SignUp;
