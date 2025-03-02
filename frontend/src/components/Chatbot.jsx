import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", isBot: true, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true); // Show typing indicator

    try {
      const response = await axios.post("http://localhost:4000/api/chatbot", {
        message: input,
        sessionId: "12345",
      });

      const botMessage = {
        text: response.data.response,
        isBot: true,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // Simulate delay
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong!", isBot: true, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }

    setInput("");
  };

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border border-gray-300 transition-all transform animate-slideIn flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 text-white p-3 rounded-t-lg">
            <span className="font-semibold">Health Assistant</span>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-72 overflow-y-auto p-3 space-y-3 scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isBot ? "items-start" : "items-end"} space-x-2`}>
                {msg.isBot && <span className="text-2xl">🤖</span>}
                <div
                  className={`p-3 max-w-[75%] rounded-lg text-sm shadow ${
                    msg.isBot ? "bg-gray-200 text-black self-start" : "bg-blue-500 text-white self-end"
                  }`}
                >
                  {msg.text}
                </div>
                {!msg.isBot && <span className="text-2xl">👤</span>}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <div className="bg-gray-200 p-2 rounded-lg text-sm animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="flex border-t border-gray-300 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
  