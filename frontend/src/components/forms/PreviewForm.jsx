import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import "./PreviewForm.css";

function PreviewForm() {
  const { formMeta, formFields } = useForm();
  const navigate = useNavigate();

  // Local state for user inputs (temporary)
  const [formData, setFormData] = useState(
    formFields.map((field) => {
      if (field.type === "Multiple Choice") return [];
      if (field.type === "Rating") return 0;
      return "";
    })
  );

  const handleChange = (idx, value) => {
    const updated = [...formData];
    updated[idx] = value;
    setFormData(updated);
  };

  const handleMultiChoiceChange = (idx, option) => {
    const updated = [...formData];
    if (updated[idx].includes(option)) {
      updated[idx] = updated[idx].filter((o) => o !== option);
    } else {
      updated[idx] = [...updated[idx], option];
    }
    setFormData(updated);
  };

  const handleRatingChange = (idx, value) => {
    const updated = [...formData];
    updated[idx] = value;
    setFormData(updated);
  };

  if (!formMeta.title) {
    return <p>No form data provided.</p>;
  }

  return (
    <div className="preview-container">
      <h2>{formMeta.title}</h2>
      <p>{formMeta.description}</p>

      <form>
        {formFields.map((field, idx) => (
          <div key={idx} className="preview-item">
            <h5>Question {idx + 1}</h5>
            <label>
              {field.label}
              {field.isRequired && <span className="required">*</span>}
            </label>

            {field.type === "Short Text" && (
              <input
                type="text"
                placeholder="Your answer"
                value={formData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            )}

            {field.type === "Paragraph" && (
              <textarea
                placeholder="Your answer"
                value={formData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              ></textarea>
            )}

            {field.type === "Dropdown" && (
              <select
                value={formData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              >
                <option value="">Select</option>
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "Single Choice" && (
              <div>
                {field.options.map((opt, i) => (
                  <label key={i} className="choice-option">
                    <input
                      type="radio"
                      name={`radio-${idx}`}
                      value={opt}
                      checked={formData[idx] === opt}
                      onChange={(e) => handleChange(idx, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {field.type === "Multiple Choice" && (
              <div>
                {field.options.map((opt, i) => (
                  <label key={i} className="choice-option">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={formData[idx].includes(opt)}
                      onChange={() => handleMultiChoiceChange(idx, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {field.type === "Date" && (
              <input
                type="date"
                value={formData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            )}

            {field.type === "Number" && (
              <input
                type="number"
                value={formData[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            )}

            {field.type === "Rating" && (
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    style={{
                      fontSize: "2rem",
                      cursor: "pointer",
                      color: formData[idx] >= n ? "#ffc107" : "#e4e5e9",
                    }}
                    onClick={() => handleRatingChange(idx, n)}
                  >
                    ★
                  </span>
                ))}
                {formData[idx] > 0 && (
                  <span className="rating-value">{formData[idx]}</span>
                )}
              </div>
            )}

            {field.type === "Yes/No" && (
              <div>
                <label className="choice-option">
                  <input
                    type="radio"
                    name={`yesno-${idx}`}
                    value="Yes"
                    checked={formData[idx] === "Yes"}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  />
                  Yes
                </label>
                <label className="choice-option">
                  <input
                    type="radio"
                    name={`yesno-${idx}`}
                    value="No"
                    checked={formData[idx] === "No"}
                    onChange={(e) => handleChange(idx, e.target.value)}
                  />
                  No
                </label>
              </div>
            )}
          </div>
        ))}
      </form>

      <button type="button" onClick={() => navigate("/user/createform", { state: { fromPreview: true } })}>
        Back to Edit
      </button>
    </div>
  );
}

export default PreviewForm;
