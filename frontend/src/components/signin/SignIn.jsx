import React, { useState } from "react";
import "./SignIn.css";
import { LoginUser } from "../../services/axiosConfig.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  /* ---------------------------- state ---------------------------------- */
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [fieldsTouched, setFieldsTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /* --------------------------- handlers -------------------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFieldsTouched({ ...fieldsTouched, [name]: true });
  };

  const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu)$/i.test(email);

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
      navigate("/dashboard"); // <- redirect on success
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
