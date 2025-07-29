import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UpsertForm from "./UpsertForm";

function FetchAndRenderForm() {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [formId]);

  if (loading) return <p>Loading...</p>;

  return <UpsertForm mode="update" formData={formData} />;
}

export default FetchAndRenderForm;
