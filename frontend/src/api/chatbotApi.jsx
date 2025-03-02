import axios from "axios";

const BASE_URL = "http://localhost:4000/api/chatbot"; // Adjust if different

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post(BASE_URL, { message });
    return response.data.response; // Assuming backend sends { response: "..." }
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    return "Sorry, I couldn't process your request.";
  }
};
