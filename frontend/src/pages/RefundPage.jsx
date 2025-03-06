import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const RefundPage = () => {
  const { appointmentId } = useParams(); // Get appointmentId from URL
  const navigate = useNavigate();

  const [refundReason, setRefundReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRefundSubmit = async (e) => {
    e.preventDefault();

    if (!refundReason || (refundReason === "Other" && !customReason)) {
      toast.error(
        "Please select a refund reason or provide details for 'Other'"
      );
      return;
    }

    setLoading(true);

    try {
      // Simulate an API call for refund processing
      setTimeout(() => {
        setLoading(false);
        toast.success(
          "Refund request submitted. It will be processed in 7 days."
        );

        // Generate PDF after submitting the refund
        generateRefundPDF();

        navigate("/my-appointments");
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while processing your refund request.");
    }
  };

  const generateRefundPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MediCare - Your Health, Our Priority", 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Refund Request Details", 14, 30);

    // Appointment and Refund Details
    doc.text(`Appointment ID: ${appointmentId}`, 14, 40);
    doc.text(`Refund Reason: ${refundReason}`, 14, 50);
    if (refundReason === "Other") {
      doc.text(`Custom Reason: ${customReason}`, 14, 60);
    }
    doc.text(`Refund Request Date: ${new Date().toLocaleString()}`, 14, 70);

    // Customer Care Section
    doc.setFont("helvetica", "bold");
    doc.text("Customer Care:", 14, 85);
    doc.setFont("helvetica", "normal");
    doc.text("Vatsal Savani", 14, 95);
    doc.text("Phone: +91 8329351893", 14, 105);
    doc.text("Email: vatsalsavani594@gmail.com", 14, 115);
    doc.text("Customer Executive: Chirag Rawal", 14, 125);
    doc.text("Phone: +91 9699601893", 14, 135);
    doc.text("Email: chiragrawal@gmail.com", 14, 145);

    // Company Address
    doc.setFont("helvetica", "bold");
    doc.text("MediCare Office Address:", 14, 155);
    doc.setFont("helvetica", "normal");
    doc.text("MediCare Healthcare Pvt. Ltd.", 14, 165);
    doc.text("MediCare office - Mumbai, Maharashtra, India", 14, 175);

    // Terms and Conditions
    doc.setFont("helvetica", "bold");
    doc.text("Refund Terms & Conditions:", 14, 185);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Refund requests are typically processed within 7 business days.",
      14,
      195
    );

    // Footer with clickable website and social media links
    doc.setFont("helvetica", "bold");
    doc.text("Website: http://localhost:5173/", 14, 210);

    // Social Media Links
    const yPosition = 220;
    doc.setFont("helvetica", "normal");
    doc.textWithLink("LinkedIn", 14, yPosition, {
      url: "https://www.linkedin.com/in/vatsal-savani-b296ab318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    });
    doc.textWithLink(" | X", 80, yPosition, {
      url: "https://x.com/VatsaL594?s=09",
    });
    doc.textWithLink(" | Instagram", 150, yPosition, {
      url: "https://www.instagram.com/vatssal.savani_?igsh=bmp6dzNmajRuczZq",
    });

    // Save the PDF
    doc.save(`Refund_Request_${appointmentId}.pdf`);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Request Refund for Appointment ID: {appointmentId}
      </h2>

      <form onSubmit={handleRefundSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="refundReason"
            className="block text-sm font-medium text-gray-700"
          >
            Refund Reason
          </label>
          <select
            id="refundReason"
            name="refundReason"
            value={refundReason}
            onChange={(e) => {
              setRefundReason(e.target.value);
              if (e.target.value !== "Other") setCustomReason("");
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Refund Reason"
          >
            <option value="">Select a reason</option>
            <option value="Medical emergency">Medical emergency</option>
            <option value="Appointment canceled by doctor">
              Appointment canceled by doctor
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        {refundReason === "Other" && (
          <div>
            <label
              htmlFor="customReason"
              className="block text-sm font-medium text-gray-700"
            >
              Please provide details
            </label>
            <textarea
              id="customReason"
              name="customReason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your reason here..."
            ></textarea>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className={`w-full py-2 mt-4 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Refund Request"}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Do you want to submit this refund request for Appointment ID:{" "}
              {appointmentId}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-200 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRefundSubmit}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundPage;
