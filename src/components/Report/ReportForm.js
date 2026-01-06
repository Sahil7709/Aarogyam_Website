import React, { useState } from "react";
import ResultsEditor from "./ResultsEditor";

const initialState = {
  category: "blood-test",
  date: "",
  results: {},
  notes: ""
};

const ReportForm = ({ onSubmit, submitting }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => setFormData(initialState);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData, resetForm);
      }}
      className="bg-white shadow-lg rounded-lg p-6 border"
    >
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg"
      >
        <option value="blood-test">Hematology</option>
        <option value="gut-test">Gastrointestinal</option>
        <option value="urine-test">Urological</option>
        <option value="liver-function">Liver Health</option>
        <option value="kidney-function">Kidney Health</option>
        <option value="lipid-profile">Lipid Health</option>
        <option value="thyroid-test">Thyroid Health</option>
        <option value="diabetes-panel">Diabetes Health</option>
        <option value="cardiac-markers">Cardiac Health</option>
        <option value="inflammatory-markers">Inflammatory Health</option>
        <option value="vitamin-levels">Vitamin Health</option>
        <option value="mineral-levels">Mineral Health</option>
        <option value="hormone-test">Hormone Health</option>
        <option value="tumor-markers">Tumor Health</option>
        <option value="allergy-test">Allergy Health</option>
        <option value="immunology-test">Immunology Health</option>
        <option value="coagulation-profile">Coagulation Health</option>
        <option value="electrolyte-panel">Electrolyte Health</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg"
        required
      />

      <ResultsEditor
        results={formData.results}
        setResults={(results) =>
          setFormData({ ...formData, results })
        }
      />

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full mt-4 p-3 border rounded-lg"
        rows="3"
      />

      <button
        disabled={submitting}
        className={`mt-5 w-full py-3 rounded-lg text-white font-medium
          ${submitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {submitting ? "Saving..." : "Save Report"}
      </button>
    </form>
  );
};

export default ReportForm;