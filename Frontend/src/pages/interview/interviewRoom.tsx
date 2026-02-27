import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { VideoOff, Video } from 'lucide-react';

//  adding the user webcamera view instead of using the webRTC just for the  camera preview
const InterviewRoom = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">

        {/* this is the vedio section and around this section involves the camera functionality */}
        <div className="flex-1 bg-black rounded-xl overflow-hidden relative">
          {isCameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Camera is Off
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex gap-3">
            {!isCameraOn ? (
              <button
                onClick={startCamera}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                <Video size={30}/>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                <VideoOff size={30} />
              </button>
            )}
          </div>
        </div>

        <div className="w-96 bg-white rounded-xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Current Question</h2>

          <div className="flex-1 bg-gray-100 rounded p-3">
            Question will appear here...
          </div>

          <button className="mt-4 bg-black text-white py-2 rounded">
            Next Question
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default InterviewRoom;