import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";

const SYMPTOM_OPTIONS = [
  { value: "fever", label: "Fever" },
  { value: "cough", label: "Cough" },
  { value: "fatigue", label: "Fatigue" },
  { value: "headache", label: "Headache" },
  { value: "nausea", label: "Nausea" },
  { value: "chest_pain", label: "Chest Pain" },
  { value: "shortness_of_breath", label: "Shortness of Breath" },
  { value: "sore_throat", label: "Sore Throat" },
  { value: "loss_of_taste", label: "Loss of Taste" },
  { value: "loss_of_smell", label: "Loss of Smell" },
  { value: "body_ache", label: "Body Ache" },
  { value: "runny_nose", label: "Runny Nose" },
  { value: "vomiting", label: "Vomiting" },
  { value: "diarrhea", label: "Diarrhea" },
  { value: "dizziness", label: "Dizziness" },
  { value: "skin_rash", label: "Skin Rash" },
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSymptomChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions.map((option) => option.value));
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5001/predict", {
        symptoms: selectedSymptoms,
      });
      setResult(data.predicted_disease);
      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Error fetching results.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">🔍 AI Symptom Checker</h2>
        <p className="text-gray-600 text-center mb-4">Select your symptoms and get a prediction</p>

        {/* Dropdown for symptom selection */}
        <Select
          options={SYMPTOM_OPTIONS}
          isMulti
          onChange={handleSymptomChange}
          className="mb-4"
          placeholder="Select symptoms..."
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Disease"}
        </button>

        {result && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center">
            <strong>Diagnosis:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
