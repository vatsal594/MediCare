import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Expanded symptom list with 20 features
SYMPTOMS = [
    "fever", "cough", "fatigue", "headache", "nausea", "chest_pain",
    "shortness_of_breath", "sore_throat", "loss_of_taste", "loss_of_smell",
    "body_ache", "runny_nose", "vomiting", "diarrhea", "dizziness", "skin_rash",
    "heart_palpitations", "joint_pain", "confusion", "blurred_vision"
]

# Expanded diseases list
DISEASES = [
    "Flu", "Cold", "COVID-19", "Migraine", "Food Poisoning",
    "Heart Disease", "Pneumonia", "Allergy", "Anemia", "Diabetes"
]

# Training data with symptom severity levels (0 = none, 1 = mild, 2 = moderate, 3 = severe)
X_train = np.array([
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],  # Flu
    [2, 2, 1, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0],  # Cold
    [3, 3, 2, 2, 0, 0, 3, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],  # COVID-19
    [0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0],  # Migraine
    [0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, 0, 0, 0],  # Food Poisoning
    [0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0],  # Heart Disease
    [2, 2, 2, 1, 0, 0, 3, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],  # Pneumonia
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 0, 0],  # Allergy
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 2, 2],  # Anemia
    [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3]   # Diabetes
])

# Encode disease labels
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(DISEASES)

# Train a Random Forest model (better than Decision Tree)
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Save model, label encoder, and symptom list
joblib.dump((model, label_encoder, SYMPTOMS), "symptom_model.pkl")

print("✅ Model retrained with more diseases & symptoms! Saved as 'symptom_model.pkl'")
