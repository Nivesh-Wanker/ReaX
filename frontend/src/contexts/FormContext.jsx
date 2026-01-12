// import React, { createContext, useState, useContext } from "react";

// const FormContext = createContext();

// export function FormProvider({ children }) {
//   const [formMeta, setFormMeta] = useState({ title: "", description: "" });
//   const [formFields, setFormFields] = useState([]);

//   return (
//     <FormContext.Provider value={{ formMeta, setFormMeta, formFields, setFormFields }}>
//       {children}
//     </FormContext.Provider>
//   );
// }

// export function useForm() {
//   return useContext(FormContext);
// }

import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formMeta, setFormMeta] = useState({ title: "", description: "" });
  const [formFields, setFormFields] = useState([]);

  const resetForm = () => {
    setFormMeta({ title: "", description: "" });
    setFormFields([]);
  };

  return (
    <FormContext.Provider
      value={{
        formMeta,
        setFormMeta,
        formFields,
        setFormFields,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

