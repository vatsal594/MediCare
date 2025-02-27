export const generateVideoCallLink = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        // Generate Jitsi Meet link
        const jitsiLink = `https://meet.jit.si/MediCare-${appointmentId}`;

        res.json({ success: true, callLink: jitsiLink }); // ✅ Returns success: true
    } catch (error) {
        console.error("Error generating video call link:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
