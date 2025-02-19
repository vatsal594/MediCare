export const getPrediction = async (selectedSymptoms) => {
    try {
        // Convert symptoms to lowercase for consistency with backend
        const formattedSymptoms = selectedSymptoms.map(symptom => symptom.toLowerCase());

        const response = await fetch("http://127.0.0.1:5001/predict", { // Changed port to 5001
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ symptoms: formattedSymptoms }) // Ensure symptoms are sent correctly
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch prediction.");
        }

        return data.predicted_disease; // Ensure this matches the backend response key
    } catch (error) {
        console.error("API Error:", error.message); // Improved error logging
        return "Error analyzing symptoms. Please try again.";
    }
};
