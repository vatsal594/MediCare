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
  const [healthTips, setHealthTips] = useState([]); // ✅ Store health tips

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
      setHealthTips(data.health_tips || []); // ✅ Store health tips

      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Error fetching results.");
      setResult(null);
      setHealthTips([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 p-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">AI Symptom Checker</h2>
        <p className="text-gray-700 mb-4 text-sm">Select your symptoms and get a disease prediction powered by AI.</p>

        {/* Dropdown for symptom selection */}
        <Select
          options={SYMPTOM_OPTIONS}
          isMulti
          onChange={handleSymptomChange}
          className="mb-4 text-black"
          placeholder="Select symptoms..."
          isClearable
        />

        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 transition duration-300 disabled:bg-gray-400"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin">🔄</span>
          ) : (
            "Check Disease"
          )}
        </button>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">Diagnosis Result:</h3>
            <p className="mt-2 text-base">{result}</p>

            {/* Health Tips Section */}
            {healthTips.length > 0 && (
              <div className="mt-3 text-left">
                <h4 className="text-md font-semibold text-green-700">Health Tips:</h4>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {healthTips.map((tip, index) => (
                    <li key={index} className="mt-1">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SymptomChecker;
