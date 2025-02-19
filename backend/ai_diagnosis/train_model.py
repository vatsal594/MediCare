import joblib
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

# Updated symptom list (16 features)
SYMPTOMS = [
    "fever", "cough", "fatigue", "headache", "nausea", "chest_pain",
    "shortness_of_breath", "sore_throat", "loss_of_taste", "loss_of_smell",
    "body_ache", "runny_nose", "vomiting", "diarrhea", "dizziness", "skin_rash"
]

# Updated diseases list
DISEASES = ["Flu", "Cold", "COVID-19", "Migraine", "Food Poisoning", "Heart Disease"]

# Updated training data with 16 features
X_train = np.array([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],  # Flu
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],  # Cold
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],  # COVID-19
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],  # Migraine
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],  # Food Poisoning
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]   # Heart Disease
])

# Encode disease labels
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(DISEASES)

# Train a Decision Tree model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Save model, label encoder, and symptom list
joblib.dump((model, label_encoder, SYMPTOMS), "symptom_model.pkl")

print("✅ Model retrained and saved successfully as 'symptom_model.pkl'")
