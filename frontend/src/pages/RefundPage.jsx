import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RefundPage = () => {
  const { appointmentId } = useParams();  // Get appointmentId from URL
  const navigate = useNavigate();

  const [refundReason, setRefundReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRefundSubmit = async (e) => {
    e.preventDefault();

    if (!refundReason || (refundReason === 'Other' && !customReason)) {
      toast.error("Please select a refund reason or provide details for 'Other'");
      return;
    }

    setLoading(true);

    try {
      // Simulate an API call for refund processing
      setTimeout(() => {
        setLoading(false);
        toast.success("Refund request submitted. It will be processed in 7 days.");
        navigate("/my-appointments");
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while processing your refund request.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Request Refund for Appointment ID: {appointmentId}</h2>
      
      <form onSubmit={handleRefundSubmit} className="space-y-4">
        <div>
          <label htmlFor="refundReason" className="block text-sm font-medium text-gray-700">Refund Reason</label>
          <select 
            id="refundReason"
            name="refundReason"
            value={refundReason}
            onChange={(e) => {
              setRefundReason(e.target.value);
              if (e.target.value !== 'Other') setCustomReason('');
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Refund Reason"
          >
            <option value="">Select a reason</option>
            <option value="Medical emergency">Medical emergency</option>
            <option value="Appointment canceled by doctor">Appointment canceled by doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {refundReason === 'Other' && (
          <div>
            <label htmlFor="customReason" className="block text-sm font-medium text-gray-700">Please provide details</label>
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
          className={`w-full py-2 mt-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-500'}`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Refund Request"}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-sm text-gray-600 mt-2">Do you want to submit this refund request for Appointment ID: {appointmentId}?</p>
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
