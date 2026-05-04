import { Send,Camera,CameraOff } from "lucide-react";
import { useRef, useState } from "react";

type Message = {
  id: number;
  sender: "me" | "other";
  name?: string;
  time: string;
  text: string;
};

const messages: Message[] = [
  {
    id: 1,
    sender: "other",
    name: "AI Interviewer",
    time: "10:42 AM",
    text: "Should we handle the null root case explicitly at the start?",
  },
  {
    id: 2,
    sender: "me",
    time: "10:43 AM",
    text: "The helper function already handles it by returning 0, so I think it's covered.",
  },
];

const ChatSystem = () => {
  const [input, setInput] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }

      setCameraOn(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied or not available.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  return (
    <div className="bg-gray-200 w-110 h-178 px-6 pt-4 flex flex-col gap-4 items-center">
      <div className="flex gap-6">
        <div className="relative bg-black rounded-xl h-40 w-40 overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${
              cameraOn ? "block" : "hidden"
            }`}
          />
          {!cameraOn && <span className="text-white text-sm">Camera Off</span>}

          <button
            onClick={cameraOn ? stopCamera : startCamera}
            className="absolute bottom-2 left-2 bg-gray-700/60 text-white p-1 rounded"
          >
            {cameraOn ? <CameraOff /> : <Camera/>}
          </button>
        </div>
        <div className="bg-black rounded-xl h-40 w-40 overflow-hidden flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="AI"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
      <div className="h-127 bg-white w-full rounded-xl flex flex-col shadow-md">
        <div className="p-4">
          <h1 className="text-teal-700 font-semibold tracking-wide">
            AI INTERVIEWER
          </h1>
          <div className="w-full h-px bg-gray-200 mt-2"></div>
        </div>
        <div className="flex-1 px-4 flex flex-col gap-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "me" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs text-gray-500 mb-1">
                {msg.sender === "other"
                  ? `${msg.name} • ${msg.time}`
                  : `You • ${msg.time}`}
              </span>

              <div
                className={`px-4 py-3 rounded-xl max-w-[75%] text-sm ${
                  msg.sender === "me"
                    ? "bg-teal-800 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-white flex items-center gap-2 rounded-b-xl">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 outline-none text-md font-semibold"
          />

          <button className="bg-teal-800 text-white p-2 rounded-full hover:bg-teal-900 transition">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
