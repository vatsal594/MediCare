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
      height: 600,
    };

    const jitsiApi = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      jitsiApi.dispose();
    };
  }, [meetingId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Video Call</h1>
      <p>Meeting ID: {meetingId}</p>
      <div ref={jitsiContainerRef} className="w-full h-[80vh]"></div>
    </div>
  );
};

export default VideoCall;
