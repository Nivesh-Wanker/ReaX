
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import "./UpsertForm.css";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import {
  FaRegCommentDots, FaRegListAlt, FaCheckCircle,
  FaStar, FaRegCalendarAlt, FaRegKeyboard, FaHashtag, FaCheckSquare
} from "react-icons/fa";

const fieldTypes = [
  { value: "Short Text", label: <> <FaRegKeyboard style={{ marginRight: 6 }}/> Short Text </> },
  { value: "Paragraph", label: <> <FaRegCommentDots style={{ marginRight: 6 }}/> Paragraph </> },
  { value: "Dropdown", label: <> <FaRegListAlt style={{ marginRight: 6 }}/> Dropdown </> },
  { value: "Single Choice", label: <> <FaCheckCircle style={{ marginRight: 6 }}/> Single Choice </> },
  { value: "Multiple Choice", label: <> <FaCheckSquare style={{ marginRight: 6 }}/> Multiple Choice </> },
  { value: "Date", label: <> <FaRegCalendarAlt style={{ marginRight: 6 }}/> Date </> },
  { value: "Number", label: <> <FaHashtag style={{ marginRight: 6 }}/> Number </> },
  { value: "Rating", label: <> <FaStar style={{ marginRight: 6 }}/> Rating </> },
  { value: "Yes/No", label: <> <FaCheckCircle style={{ marginRight: 6 }}/> Yes/No </> },
];

function UpsertForm({ mode = "create", formData = null }) {
  const location = useLocation();
  const { formMeta, setFormMeta, formFields, setFormFields, resetForm } = useForm();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (mode === "create" && !formData) {
  //     resetForm();
  //   }
  //   else if (mode === "update" && formData) {
  //     setFormMeta(formData.meta);
  //     setFormFields(formData.fields);
  //   }
  // }, []);

    useEffect(() => {
    if (mode === "create" && !formData && !location.state?.fromPreview) {
      resetForm();
    } else if (mode === "update" && formData) {
      setFormMeta(formData.meta);
      setFormFields(formData.fields);
    }
  }, []);


  const addField = () => {
    setFormFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: "",
        type: "",
        options: [],
        isRequired: false,
      },
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

  const toggleRequired = (id) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, isRequired: !field.isRequired } : field
      )
    );
  };

  const deleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  };

  const validateForm = () => {
    if (!formMeta.title.trim()) return "Form title is required.";

    for (let field of formFields) {
      if (!field.label.trim()) return "Every question needs a label.";
      if (
        ["Dropdown"].includes(field.type) &&
        field.options.filter(opt => opt.trim()).length < 1
      ) return "Dropdown must have at least 1 option.";
      if (
        ["Single Choice", "Multiple Choice"].includes(field.type) &&
        field.options.filter(opt => opt.trim()).length < 2
      ) return "Choice questions must have at least 2 options.";
    }

    return null; // no errors
  };

  const handleSaveForm = () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const payload = {
      meta: formMeta,
      fields: formFields,
    };

    if (mode === "update") {
      console.log("Update API call:", payload);
    } else {
      console.log("Create API call:", payload);
    }

    alert("Form saved (simulated)!");
  };

  const handlePreview = () => {
    navigate("/user/previewform");
  };

  return (
    <div className="create-form-container">
      <div className="form-meta-card">
        <input
          type="text"
          placeholder="Title"
          value={formMeta.title}
          onChange={(e) => setFormMeta({ ...formMeta, title: e.target.value })}
          className="form-title-input"
        />
        <input
          type="text"
          placeholder="Form description"
          value={formMeta.description}
          onChange={(e) => setFormMeta({ ...formMeta, description: e.target.value })}
          className="form-description-input"
        />
      </div>

      <div className="question-list-wrapper">
      {formFields.map((field, idx) => (
        <div key={field.id} className="question-card">
          <div className="card-header">
            <h5>Question {idx + 1}</h5>
          </div>

          <input
            type="text"
            placeholder="Enter question"
            value={field.label}
            onChange={(e) => handleLabelChange(field.id, e.target.value)}
            className="question-input"
          />

          <Select
            value={fieldTypes.find(option => option.value === field.type)}
            onChange={(selected) => handleTypeChange(field.id, selected.value)}
            options={fieldTypes}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />

          {(field.type === "Dropdown" ||
            field.type === "Single Choice" ||
            field.type === "Multiple Choice") && (
            <div className="options-list">
              {field.options.map((option, optIdx) => (
                <div key={optIdx} className="option-item">
                  <input
                    type="text"
                    value={option}
                    placeholder={`Option ${optIdx + 1}`}
                    onChange={(e) => {
                      const updatedOptions = [...field.options];
                      updatedOptions[optIdx] = e.target.value;
                      setFormFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id ? { ...f, options: updatedOptions } : f
                        )
                      );
                    }}
                    className="option-input"
                  />
                  <button
                    type="button"
                    className="delete-option-btn"
                    onClick={() => {
                      const updatedOptions = field.options.filter((_, i) => i !== optIdx);
                      setFormFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id ? { ...f, options: updatedOptions } : f
                        )
                      );
                    }}
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-option-btn"
                onClick={() => {
                  const updatedOptions = [...field.options, ""];
                  setFormFields((prev) =>
                    prev.map((f) =>
                      f.id === field.id ? { ...f, options: updatedOptions } : f
                    )
                  );
                }}
              >
                + Add Option
              </button>
            </div>
          )}

          <div className="question-actions">
            <label className="required-toggle">
              Required
              <input
                type="checkbox"
                checked={field.isRequired}
                onChange={() => toggleRequired(field.id)}
              />
              <span className="slider"></span>
            </label>
            <button
              type="button"
              className="delete-icon-btn"
              onClick={() => deleteField(field.id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>

      <button className="add-field-btn" onClick={addField}>
        + Add new question
      </button>

      <div className="form-action-buttons">
        <button
          className="save-form-btn"
          onClick={handleSaveForm}
          disabled={formFields.length === 0 || !formMeta.title}
        >
          Save Form
        </button>
        <button
          className="preview-form-btn"
          onClick={handlePreview}
          disabled={formFields.length === 0 || !formMeta.title}
        >
          Preview Form
        </button>
      </div>
    </div>
  );
}

export default UpsertForm;


