from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib  # For loading pre-trained models
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and label encoder
try:
    model, label_encoder = joblib.load("symptom_model.pkl")  # Use joblib for loading
    print("Model and label encoder loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    raise RuntimeError(f"Error loading model: {e}")

# List of symptoms the model understands
SYMPTOMS = ["fever", "cough", "fatigue", "headache", "nausea", "chest_pain"]

@app.route('/')
def home():
    return "AI Diagnosis API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)  # Debugging log

        symptoms = data.get("symptoms", [])
        if not symptoms:
            print("Error: No symptoms provided")  # Debugging log
            return jsonify({"error": "No symptoms provided"}), 400

        # Convert input symptoms to lowercase and format correctly
        symptoms = [s.lower() for s in symptoms]  
        print("Processed symptoms:", symptoms)  # Debugging log

        input_data = np.array([[1 if symptom in symptoms else 0 for symptom in SYMPTOMS]])
        print("Model input data:", input_data)  # Debugging log

        # Predict using the model
        prediction_index = model.predict(input_data)[0]
        print("Prediction index:", prediction_index)  # Debugging log

        # Convert prediction index back to disease label
        predicted_disease = label_encoder.inverse_transform([prediction_index])[0]
        print("Predicted disease:", predicted_disease)  # Debugging log

        return jsonify({"predicted_disease": predicted_disease})

    except Exception as e:
        print("Error:", str(e))  # Debugging log
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Match frontend API URL
