import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const { meetingId } = useParams();
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      console.error("Jitsi Meet API script not loaded");
      return;
    }

    const domain = "meet.jit.si";
    const options = {
      roomName: meetingId,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
    };

    const jitsiApi = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      jitsiApi.dispose();
    };
  }, [meetingId]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Video Call Container */}
      <div className="w-full max-w-4xl h-[85vh] bg-white shadow-lg rounded-lg flex flex-col p-4">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Video Consultation</h1>
          <p className="text-gray-600">Your doctor will join soon.</p>
        </div>

        {/* Meeting ID */}
        <div className="text-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-lg font-medium mb-4">
          Meeting ID: <span className="font-semibold">{meetingId}</span>
        </div>

        {/* Jitsi Video Call */}
        <div className="flex-grow w-full rounded-lg overflow-hidden bg-gray-200">
          <div ref={jitsiContainerRef} className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
