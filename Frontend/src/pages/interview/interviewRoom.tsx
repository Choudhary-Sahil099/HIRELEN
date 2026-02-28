import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Video, VideoOff, Mic, MicOff, Maximize2, Minimize2 } from "lucide-react";

const InterviewRoom = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [inputMode, setInputMode] = useState<"voice" | "typed" | "idle">("idle");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isWritingMode, setIsWritingMode] = useState(false);


  const startCamera = async () => {
    try {
      if (streamRef.current) return;

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setIsCameraOn(true);
      setIsMicOn(true);

      startSpeechRecognition();
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsCameraOn(false);
    setIsMicOn(false);
    setInputMode("idle");
  };

  const toggleMic = () => {
    if (!streamRef.current) return;

    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMicOn((prev) => !prev);
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let text = "";

      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
      setInputMode("voice");
      resetIdleTimer();
    };

    recognitionRef.current = recognition;
  }, []);

  const startSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      setInputMode("idle");
    }, 5000); 
  };

  const handleTyping = (value: string) => {
    setTypedAnswer(value);
    setInputMode("typed");
    resetIdleTimer();
  };


  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);


  return (
    <DashboardLayout>
      {/* Alternate wrting section section */}
      <div className="relative h-full w-full bg-white">
        <div className="absolute inset-0 p-6">
          {isWritingMode && (
            <>
              <h2 className="text-xl font-semibold mb-3">
                Coding / Writing Section
              </h2>

              <textarea
                value={typedAnswer}
                onChange={(e) => handleTyping(e.target.value)}
                placeholder="Start typing here..."
                className="w-full h-[95%] border-none rounded-xl text-lg resize-none focus:outline-none focus:ring-none "
              />
            </>
          )}
        </div>
 
          {/* Camera section */}
        <div
          className={`bg-black rounded-xl overflow-hidden shadow-xl transition-all duration-500 ${
            isWritingMode
              ? "absolute bottom-6 right-6 w-72 h-48 z-50"
              : "absolute inset-0 z-40"
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              Camera is Off
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">

            {!isCameraOn ? (
              <button onClick={startCamera} className="bg-green-500 p-2 rounded-full">
                <Video size={18} className="text-white" />
              </button>
            ) : (
              <button onClick={stopCamera} className="bg-red-500 p-2 rounded-full">
                <VideoOff size={18} className="text-white" />
              </button>
            )}

            {/* Mic section */}
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full ${
                isMicOn ? "bg-gray-700" : "bg-red-500"
              }`}
            >
              {isMicOn ? (
                <Mic size={18} className="text-white" />
              ) : (
                <MicOff size={18} className="text-white" />
              )}
            </button>
          </div>
          <button
            onClick={() => setIsWritingMode((prev) => !prev)}
            className="absolute top-3 right-3 bg-black/60 p-2 rounded-full backdrop-blur-md"
          >
            {isWritingMode ? (
              <Maximize2 size={18} className="text-white" />
            ) : (
              <Minimize2 size={18} className="text-white" />
            )}
          </button>
            

          {/* this div is only available until the app is properly ready  */}
          <div className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
            AI Monitoring: {inputMode.toUpperCase()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewRoom;