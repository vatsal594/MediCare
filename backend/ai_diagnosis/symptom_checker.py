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

# Updated Health Tips for Diseases
HEALTH_TIPS = {
    "flu": [
        "Stay hydrated with warm fluids like tea and soup.",
        "Rest and get plenty of sleep to help your body recover.",
        "Take over-the-counter medications to reduce fever and body aches."
    ],
    "cold": [
        "Drink warm beverages like honey-lemon tea to soothe your throat.",
        "Use a humidifier or take steam inhalation to relieve congestion.",
        "Get adequate rest and consume vitamin C-rich foods."
    ],
    "covid-19": [
        "Self-isolate and monitor your oxygen levels regularly.",
        "Stay hydrated and consume nutritious foods.",
        "Consult a doctor if symptoms worsen, especially shortness of breath."
    ],
    "migraine": [
        "Rest in a quiet, dark room to reduce symptoms.",
        "Avoid loud noises, bright lights, and strong smells.",
        "Drink enough water and consider relaxation techniques."
    ],
    "food poisoning": [
        "Drink electrolyte solutions to prevent dehydration.",
        "Eat bland foods like rice, bananas, and toast.",
        "Avoid dairy and greasy foods until fully recovered."
    ],
    "heart disease": [
        "Follow a heart-healthy diet rich in fruits, vegetables, and lean proteins.",
        "Exercise regularly but avoid high-intensity workouts without medical advice.",
        "Monitor blood pressure and cholesterol levels regularly."
    ],
    "pneumonia": [
        "Drink warm liquids and get plenty of rest.",
        "Use a humidifier to ease breathing difficulties.",
        "Consult a doctor immediately if experiencing severe chest pain."
    ],
    "allergy": [
        "Avoid allergens such as pollen, dust, or certain foods.",
        "Use antihistamines to relieve symptoms like sneezing and itching.",
        "Wash hands and change clothes after outdoor exposure."
    ],
    "anemia": [
        "Increase iron-rich foods such as spinach, lentils, and red meat.",
        "Take vitamin C to enhance iron absorption.",
        "Consult a doctor for proper supplementation if needed."
    ],
    "diabetes": [
        "Maintain a balanced diet with fiber-rich foods.",
        "Monitor blood sugar levels regularly.",
        "Exercise daily but avoid overexertion."
    ],
    # Default health tips
    "default": [
        "Maintain a healthy diet and drink plenty of water.",
        "Exercise regularly and get enough sleep.",
        "Consult a doctor for proper medical advice."
    ]
}

@app.route('/')
def home():
    return "✅ AI Diagnosis API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        symptoms = [s.lower() for s in symptoms]

        # Convert symptoms into numerical input format
        input_data = np.array([[2 if symptom in symptoms else 0 for symptom in SYMPTOMS]])  # Default to 2 (moderate severity)

        # Predict disease
        prediction_index = model.predict(input_data)[0]
        predicted_disease = label_encoder.inverse_transform([prediction_index])[0]

        # Fetch health tips or return default tips
        health_tips = HEALTH_TIPS.get(predicted_disease.lower(), HEALTH_TIPS["default"])

        return jsonify({
            "predicted_disease": predicted_disease,
            "health_tips": health_tips
        })

    except Exception as e:
        print("❌ Error:", str(e))  # Debugging log
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Match frontend API URL
