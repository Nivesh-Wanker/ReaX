import React, { useState } from "react";
import "./SignUp.css";
import { RegisterUser } from "../../services/axiosConfig.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldsTouched, setFieldsTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle input changes and track touched fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

    setFieldsTouched({ ...fieldsTouched, [name]: true });
  };

  // Validation helpers
  const isValidPassword = (password) => ({
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  });

  const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu)$/i.test(email);

  const isValidName = (name) =>
    /^[A-Za-z\s]+$/.test(name.trim());

  // Validation checks
  const passwordChecks = isValidPassword(formValues.password);
  const passwordStrong = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch =
    formValues.password && formValues.password === confirmPassword;
  const emailFormatValid = isValidEmail(formValues.email);
  const nameFormatValid = isValidName(formValues.name);

  const isFormValid =
    passwordStrong && passwordsMatch && emailFormatValid && nameFormatValid;

  // Submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setSubmitError("Please fill all fields correctly.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await RegisterUser(formValues);
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error);
      setSubmitError(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form className="signup-form" onSubmit={handleFormSubmit}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.name && formValues.name && !nameFormatValid && (
          <p className="signup-error">
            Name cannot contain special characters or numbers
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.email && !emailFormatValid && (
          <p className="signup-error">Enter a valid email address</p>
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

        {fieldsTouched.password && (
          <div className="password-rules">
            <p className={passwordChecks.minLength ? "valid" : "invalid"}>
              • At least 8 characters
            </p>
            <p className={passwordChecks.hasUppercase ? "valid" : "invalid"}>
              • One uppercase letter
            </p>
            <p className={passwordChecks.hasLowercase ? "valid" : "invalid"}>
              • One lowercase letter
            </p>
            <p className={passwordChecks.hasNumber ? "valid" : "invalid"}>
              • One number
            </p>
            <p className={passwordChecks.hasSpecialChar ? "valid" : "invalid"}>
              • One special character (e.g. @, !, #)
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-type Password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        {fieldsTouched.confirmPassword && !passwordsMatch && (
          <p className="signup-error">Passwords do not match</p>
        )}

        {/* Submit Error */}
        {submitError && <p className="signup-error">{submitError}</p>}

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="signup-note">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
