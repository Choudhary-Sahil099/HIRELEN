import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Video, VideoOff, Mic, MicOff } from "lucide-react";

const InterviewRoom = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const [answerMode, setAnswerMode] = useState<"voice" | "typed">("voice");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [question, setQuestion] = useState("");

  // Start Camera
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
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  // stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setIsCameraOn(false);
      setIsMicOn(false);
    }
  };

  // Toggle Mic
  const toggleMic = () => {
    if (!streamRef.current) return;

    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMicOn((prev) => !prev);
  };

  //Setup Speech Recognition
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
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="flex gap-6 h-full">
        
        {/* VIDEO SECTION */}
        <div className="flex-1 bg-black rounded-xl overflow-hidden relative shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              !isCameraOn ? "hidden" : ""
            }`}
          />

          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              Camera is Off
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
            {!isCameraOn ? (
              <button
                onClick={startCamera}
                className="bg-green-500 p-3 rounded-full"
              >
                <Video size={24} className="text-white" />
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="bg-red-500 p-3 rounded-full"
              >
                <VideoOff size={24} className="text-white" />
              </button>
            )}

            <button
              onClick={toggleMic}
              className={`p-3 rounded-full ${
                isMicOn ? "bg-gray-700" : "bg-red-500"
              }`}
            >
              {isMicOn ? (
                <Mic size={24} className="text-white" />
              ) : (
                <MicOff size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* INTERVIEW PANEL */}
        <div className="w-96 bg-white rounded-xl shadow-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Interview Panel</h2>

          {/* Question Input */}
          <label className="text-sm font-medium mb-1">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Interviewer can paste or type the question here..."
            className="mb-4 p-3 border rounded resize-none h-24"
          />

          {/* Mode Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setAnswerMode("voice")}
              className={`flex-1 py-2 rounded ${
                answerMode === "voice"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              Voice
            </button>

            <button
              onClick={() => setAnswerMode("typed")}
              className={`flex-1 py-2 rounded ${
                answerMode === "typed"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              Typed
            </button>
          </div>

          {/* Voice Mode */}
          {answerMode === "voice" && (
            <>
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-green-600 text-white py-2 rounded mb-3"
                >
                  Start Answer
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-600 text-white py-2 rounded mb-3"
                >
                  Stop Answer
                </button>
              )}

              <div className="bg-gray-50 border rounded p-3 text-sm h-32 overflow-y-auto">
                {transcript || "Your voice answer will appear here..."}
              </div>
            </>
          )}

          {/* Typed Mode */}
          {answerMode === "typed" && (
            <textarea
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Candidate can type the answer here..."
              className="p-3 border rounded resize-none h-40"
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewRoom;