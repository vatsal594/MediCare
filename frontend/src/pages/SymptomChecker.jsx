import { useState } from "react";
import axios from "axios";

const symptomsList = [
    "Fever", "Cough", "Headache", "Fatigue", "Sore Throat", "Shortness of Breath",
    "Body Aches", "Nausea", "Vomiting", "Diarrhea", "Loss of Taste", "Loss of Smell"
];

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSymptomChange = (e) => {
        const value = e.target.value;
        if (!selectedSymptoms.includes(value)) {
            setSelectedSymptoms([...selectedSymptoms, value]);
        }
    };

    const removeSymptom = (symptom) => {
        setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedSymptoms.length === 0) {
            alert("Please select at least one symptom.");
            return;
        }
        
        setLoading(true);
        setResult(null);

        try {
            // Convert symptoms to lowercase for consistency with backend
            const formattedSymptoms = selectedSymptoms.map(symptom => symptom.toLowerCase());

            const response = await axios.post("http://127.0.0.1:5001/predict", { // Updated API URL
                symptoms: formattedSymptoms
            });

            setResult(response.data.predicted_disease); // Updated key to match backend response
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setResult("Error analyzing symptoms. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center", padding: "20px" }}>
            <h2>AI-Powered Symptom Checker</h2>
            
            <select onChange={handleSymptomChange} defaultValue="">
                <option value="" disabled>Select a symptom</option>
                {symptomsList.map((symptom, index) => (
                    <option key={index} value={symptom.toLowerCase()}>{symptom}</option>
                ))}
            </select>

            <div>
                {selectedSymptoms.map((symptom, index) => (
                    <span key={index} style={{ 
                        display: "inline-block", 
                        margin: "5px", 
                        padding: "5px 10px", 
                        backgroundColor: "#ddd", 
                        borderRadius: "5px", 
                        cursor: "pointer" 
                    }}
                    onClick={() => removeSymptom(symptom)}
                    >
                        {symptom} ❌
                    </span>
                ))}
            </div>

            <br />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Checking..." : "Check Symptoms"}
            </button>

            {result && <h3>Prediction: {result}</h3>}
        </div>
    );
};



export default SymptomChecker;
