// src/components/form/FormPreview.jsx
import React from "react";
import "./FormPreview.css";

function FormPreview({ fields }) {
  return (
    <div className="form-preview-container">
      <h3>Live Preview</h3>
      <form className="form-preview">
        {fields.length === 0 && <p>No fields added yet.</p>}
        {fields.map((field, idx) => (
          <div key={idx} className="form-preview-item">
            <label>{field.label}</label>

            {field.type === "Short Text" && (
              <input type="text" placeholder="Enter text" disabled />
            )}

            {field.type === "Paragraph" && (
              <textarea placeholder="Enter long text" disabled />
            )}

            {field.type === "Dropdown" && (
              <select disabled>
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "Single Choice" && (
              <div className="option-group">
                {field.options.map((opt, i) => (
                  <label key={i}>
                    <input type="radio" name={`radio-${idx}`} disabled /> {opt}
                  </label>
                ))}
              </div>
            )}

            {field.type === "Multiple Choice" && (
              <div className="option-group">
                {field.options.map((opt, i) => (
                  <label key={i}>
                    <input type="checkbox" disabled /> {opt}
                  </label>
                ))}
              </div>
            )}

            {field.type === "Rating" && (
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n}>⭐</span>
                ))}
              </div>
            )}

            {field.type === "Yes/No" && (
              <div className="option-group">
                <label><input type="radio" disabled /> Yes</label>
                <label><input type="radio" disabled /> No</label>
              </div>
            )}

            {field.type === "Date" && (
              <input type="date" disabled />
            )}

            {field.type === "Time" && (
              <input type="time" disabled />
            )}

            {field.type === "Number" && (
              <input type="number" disabled />
            )}

            {field.type === "Slider" && (
              <input type="range" disabled min="0" max="10" />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}

export default FormPreview;