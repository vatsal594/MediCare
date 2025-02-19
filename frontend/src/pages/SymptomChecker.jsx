import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <Toaster />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">🔍 AI Symptom Checker</h2>
        <p className="text-gray-600 mb-4">Select your symptoms and get a prediction</p>

        {/* Dropdown for symptom selection */}
        <Select
          options={SYMPTOM_OPTIONS}
          isMulti
          onChange={handleSymptomChange}
          className="mb-4 text-black"
          placeholder="Select symptoms..."
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? <span className="animate-spin">🔄</span> : "Check Disease"}
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg"
          >
            <strong>Diagnosis:</strong> {result}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SymptomChecker;