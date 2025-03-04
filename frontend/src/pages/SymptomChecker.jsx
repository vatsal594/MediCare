import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im"; 

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
  const [healthTips, setHealthTips] = useState([]);

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
      setHealthTips(data.health_tips || []);
      toast.success("Prediction successful!");
    } catch (error) {
      toast.error("Error fetching results.");
      setResult(null);
      setHealthTips([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg text-center border border-gray-200"
      >
        {/* Title Section */}
        <div className="flex justify-center items-center mb-4">
          <FaHeartbeat className="text-red-500 text-4xl mr-2" />
          <h2 className="text-3xl font-extrabold text-gray-900">AI Symptom Checker</h2>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Enter your symptoms and receive a possible diagnosis instantly.
        </p>

        {/* Symptom Selection */}
        <Select
          options={SYMPTOM_OPTIONS}
          isMulti
          onChange={handleSymptomChange}
          className="mb-4 text-black"
          placeholder="Select symptoms..."
          isClearable
          styles={{
            control: (base) => ({
              ...base,
              padding: "6px",
              fontSize: "16px",
            }),
          }}
        />

        {/* Predict Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold text-lg flex items-center justify-center gap-2"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? (
            <>
              <ImSpinner8 className="animate-spin text-lg" /> Checking...
            </>
          ) : (
            <>
              <FaStethoscope /> Check Disease
            </>
          )}
        </button>

        {/* Diagnosis Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-6 p-5 bg-green-100 border border-green-400 text-green-800 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-center">
              <IoMdCheckmarkCircleOutline className="text-green-600 text-3xl" />
              <h3 className="text-lg font-bold ml-2">Diagnosis Result</h3>
            </div>
            <p className="mt-2 text-md font-medium">{result}</p>

            {/* Health Tips */}
            {healthTips.length > 0 && (
              <div className="mt-4 text-left">
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
