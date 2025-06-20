import React, { useState } from "react";
import "./CreateForm.css";
import FormPreview from "./FormPreview";

const fieldTypes = [
  "Short Text",
  "Paragraph",
  "Dropdown",
  "Single Choice",
  "Multiple Choice",
  "Rating",
  "Date",
  "Time",
  "Number",
  "Yes/No",
  "Slider"
];

function CreateForm() {
  const [formFields, setFormFields] = useState([]);

  const addField = () => {
    setFormFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: "",
        type: "Short Text",
        options: []
      }
    ]);
  };

  const handleLabelChange = (id, value) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, label: value } : field))
    );
  };

  const handleTypeChange = (id, type) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, type, options: [] } : field))
    );
  };

  const handleOptionsChange = (id, value) => {
    const options = value.split(",").map((opt) => opt.trim());
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, options } : field))
    );
  };

  const deleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  };

  const renderField = (field) => {
    return (
      <div key={field.id} className="form-field">
        <input
          type="text"
          placeholder="Enter question label"
          value={field.label}
          onChange={(e) => handleLabelChange(field.id, e.target.value)}
        />

        <select
          value={field.type}
          onChange={(e) => handleTypeChange(field.id, e.target.value)}
        >
          {fieldTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {(field.type === "Dropdown" ||
          field.type === "Single Choice" ||
          field.type === "Multiple Choice") && (
          <input
            type="text"
            placeholder="Comma separated options"
            onChange={(e) => handleOptionsChange(field.id, e.target.value)}
          />
        )}

        <button className="delete-btn" onClick={() => deleteField(field.id)}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="create-form-container">
      <h2>Create Feedback Form</h2>

      <div className="create-form-layout">
        <div className="builder-section">
          <button className="add-field-btn" onClick={addField}>
            ➕ Add New Field
          </button>

          {formFields.length === 0 ? (
            <p className="empty-text">No fields added yet.</p>
          ) : (
            <div className="form-fields-list">{formFields.map(renderField)}</div>
          )}

          <button className="save-form-btn" disabled={formFields.length === 0}>
            Save Form
          </button>
        </div>

        <FormPreview fields={formFields} />
      </div>
    </div>
  );
}

export default CreateForm;