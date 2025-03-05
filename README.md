# MediCare Doctor Appointment Booking System

## Overview

MediCare is a comprehensive doctor appointment booking system designed to streamline healthcare services. It enables users to book appointments, consult with doctors via video calls, access AI-based symptom checkers, receive digital prescriptions, and more. The system integrates AI, automation, and secure data handling to enhance the user experience.

## Features

### AI & Automation

- **AI Symptom Checker**: Predicts possible diseases based on symptoms.
- **Voice-Enabled Health Assistant** _(Upcoming)_: Allows users to describe symptoms via voice input.
- **AI-Based Prescription Suggestions** _(Upcoming)_: Provides medication recommendations based on symptoms.

### Appointment & Consultation

- **Real-Time Doctor Availability**: Users can see available slots and book instantly.
- **Video Call Integration**: Virtual consultations with doctors.
- **Live Chat with Doctors** _(Upcoming)_: Chat before booking an appointment.
- **Waitlist System** _(Upcoming)_: Join a waitlist if a doctor is fully booked.

### Prescription & Medication Management

- **E-Prescriptions** _(Upcoming)_: Digital prescriptions accessible by pharmacies.
- **Pharmacy Integration** _(Upcoming)_: Order medicines online.
- **Medication Tracker** _(Upcoming)_: Get reminders for timely medication intake.

### Health Information & Community

- **Health Blog & Articles** _(Upcoming)_: Access health-related tips and news.
- **Community Support Forums** _(Upcoming)_: Discuss health topics with peers.
- **Health Education Page**: Read articles and watch videos on various health topics.

### Security & Data Handling

- **HIPAA/GDPR Compliance** _(Upcoming)_: Secure user medical data.
- **Blockchain for Medical Records** _(Upcoming)_: Enhance security and trust.
- **Health Data Analytics Dashboard** _(Upcoming)_: Visualize personal health trends.

### Additional Features

- **Hospital & Clinic Finder** _(Upcoming)_: Find nearby hospitals/clinics with filters.
- **Insurance Integration** _(Upcoming)_: Check insurance coverage for treatments.
- **Refund Management**: Option to request a refund for appointments.

## Tech Stack

### Frontend

- React.js (with Vite)
- Tailwind CSS
- Context API

### Backend

- Node.js (Express.js)
- MongoDB (Mongoose for database handling)
- Python (AI-based symptom checker)

### Third-Party Integrations

- **Google Maps API**: For the Hospital & Clinic Finder.
- **WebRTC/Twilio/Jitsi/Agora**: For video consultations.
- **Dialogflow**: AI chatbot for health-related queries.

## Folder Structure

### Backend

```
- ai_diagnosis/        # AI model for symptom checking
- config/              # Configuration files (MongoDB, Cloudinary, etc.)
- controllers/         # Handles API logic for users, doctors, and admin
- middleware/          # Authentication and file-handling middleware
- models/              # Database schemas
- routes/              # API endpoints
- server.js           # Main entry point for backend
```

### Frontend

```
- src/
  - api/               # API call functions
  - assets/            # Images, icons, logos
  - components/        # Reusable UI components
  - context/           # Context API setup
  - pages/             # Different pages of the app
  - App.jsx            # Main React component
  - main.jsx           # Entry point
  - index.css          # Global styles
```

## Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Python (for AI model)

### Setup

1. **Clone the repository**

```sh
 git clone https://github.com/vatsal594/MediCare.git
 cd MediCare
```

2. **Set up environment variables**
   Create a `.env` file and add:

```
MONGO_URI=your_mongodb_uri
CLOUDINARY_URL=your_cloudinary_url
DIALOGFLOW_CREDENTIALS=your_dialogflow_credentials
```

3. **Install dependencies**

```sh
 cd backend
 npm install
```

```sh
 cd frontend
 npm install
```

4. **Run the application**

```sh
 cd backend
 npm start
```

```sh
 cd frontend
 npm run dev
```

## Future Enhancements

- **AI-based Disease Prediction**
- **Personalized Health Insights**
- **Automated Follow-Up Reminders**
- **Multi-language support for accessibility**

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## Contact

For queries, reach out to [your-email@example.com](mailto:your-email@example.com).
