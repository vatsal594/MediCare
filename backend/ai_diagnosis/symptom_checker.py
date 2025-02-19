from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow cross-origin requests

# Load the trained model, label encoder, and symptoms list
try:
    model, label_encoder, SYMPTOMS = joblib.load("symptom_model.pkl")
    print("✅ Model, label encoder, and symptom list loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    raise RuntimeError(f"Error loading model: {e}")

# Convert symptoms list to lowercase for uniform matching
SYMPTOMS = [s.lower() for s in SYMPTOMS]

@app.route('/')
def home():
    return "✅ AI Diagnosis API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("📥 Received data:", data)  # Debugging log

        # Extract symptoms from request
        symptoms = data.get("symptoms", [])
        if not symptoms:
            print("⚠️ Error: No symptoms provided")  # Debugging log
            return jsonify({"error": "No symptoms provided"}), 400

        # Convert input symptoms to lowercase for uniform matching
        symptoms = [s.lower() for s in symptoms]
        print("🔄 Processed symptoms:", symptoms)  # Debugging log

        # Convert symptoms into binary format based on the trained symptom list
        input_data = np.array([[1 if symptom in symptoms else 0 for symptom in SYMPTOMS]])
        print("📊 Model input data:", input_data)  # Debugging log

        # Predict disease
        prediction_index = model.predict(input_data)[0]
        print("🎯 Prediction index:", prediction_index)  # Debugging log

        # Convert prediction index back to disease name
        predicted_disease = label_encoder.inverse_transform([prediction_index])[0]
        print("🩺 Predicted disease:", predicted_disease)  # Debugging log

        return jsonify({"predicted_disease": predicted_disease})

    except Exception as e:
        print("❌ Error:", str(e))  # Debugging log
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Match frontend API URL
