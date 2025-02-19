import joblib
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

# Sample symptom dataset
SYMPTOMS = ["fever", "cough", "fatigue", "headache", "nausea", "chest_pain"]
DISEASES = ["Flu", "Cold", "COVID-19", "Migraine", "Food Poisoning", "Heart Disease"]

# Training data: Each row represents symptoms presence (1: present, 0: absent)
X_train = np.array([
    [1, 1, 1, 0, 0, 0],  # Flu
    [1, 1, 0, 0, 0, 0],  # Cold
    [1, 1, 1, 1, 0, 0],  # COVID-19
    [0, 0, 0, 1, 1, 0],  # Migraine
    [0, 0, 1, 0, 1, 0],  # Food Poisoning
    [0, 0, 0, 0, 0, 1]   # Heart Disease
])

# Convert disease labels to numerical values
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(DISEASES)

# Train a Decision Tree model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Save the trained model and label encoder
joblib.dump((model, label_encoder), "symptom_model.pkl")

print("✅ Model trained and saved successfully as 'symptom_model.pkl'")
