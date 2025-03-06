export const getPrediction = async (selectedSymptoms) => {
    try {
        // Convert symptoms to lowercase for consistency with backend
        const formattedSymptoms = selectedSymptoms.map(symptom => symptom.toLowerCase());

        const response = await fetch("http://127.0.0.1:5001/predict", { // Ensure port matches backend
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ symptoms: formattedSymptoms }) // Ensure correct format
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch prediction.");
        }

        // ✅ Return both disease and health tips
        return {
            predicted_disease: data.predicted_disease,
            health_tips: data.health_tips || [] // Ensure an empty array if no tips exist
        };
    } catch (error) {
        console.error("❌ API Error:", error.message);
        return {
            predicted_disease: "Error analyzing symptoms. Please try again.",
            health_tips: []
        };
    }
};
