import {
  Send,
  Camera,
  CameraOff,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import { socket } from "../../../sockets/socket";
type Message = {
  id: number;
  sender: "me" | "other";
  name?: string;
  time: string;
  text: string;
};

type SocketMessage = {
  sender: "candidate" | "ai";
  message: string;
};

const ChatSystem = () => {
  const [searchParams] =
    useSearchParams();
  const sessionId = Number(
    searchParams.get("sessionId")
  );
  const [input, setInput] =
    useState("");

  const [cameraOn, setCameraOn] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [isTyping, setIsTyping] =
    useState(false);
  const videoRef =
    useRef<HTMLVideoElement | null>(
      null
    );

  const streamRef =
    useRef<MediaStream | null>(null);
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    console.log(
      "JOINING SESSION:",
      sessionId
    );
    socket.emit(
      "join-session",
      sessionId
    );
    const handleNewMessage = (
      data: SocketMessage
    ) => {

      setIsTyping(false);

      const newMessage: Message = {

        id:
          Date.now() +
          Math.random(),

        sender:
          data.sender ===
          "candidate"
            ? "me"
            : "other",

        name:
          data.sender === "ai"
            ? "AI Interviewer"
            : undefined,

        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

        text: data.message,
      };

      setMessages((prev) => [
        ...prev,
        newMessage,
      ]);
    };

    socket.on(
      "new-message",
      handleNewMessage
    );

    return () => {

      socket.off(
        "new-message",
        handleNewMessage
      );
    };

  }, [sessionId]);
  const sendMessage = () => {

    if (
      !input.trim() ||
      !sessionId
    ) {
      return;
    }

    setIsTyping(true);

    console.log(
      "SENDING TO SESSION:",
      sessionId
    );

    socket.emit(
      "candidate-message",
      {
        sessionId,
        message: input,
      }
    );

    setInput("");
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const startCamera =
    async () => {

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
              audio: false,
            }
          );

        streamRef.current =
          stream;

        if (videoRef.current) {

          videoRef.current.srcObject =
            stream;

          videoRef.current.onloadedmetadata =
            () => {

              videoRef.current?.play();
            };
        }

        setCameraOn(true);

      } catch (err) {

        console.error(
          "Camera error:",
          err
        );

        alert(
          "Camera access denied or not available."
        );
      }
    };

  const stopCamera = () => {

    streamRef.current
      ?.getTracks()
      .forEach((track) =>
        track.stop()
      );

    streamRef.current = null;

    setCameraOn(false);
  };
  if (!sessionId) {

    return (

      <div className="w-full h-screen flex items-center justify-center">

        <div className="text-xl font-semibold text-red-500">

          Invalid Session ID

        </div>

      </div>
    );
  }

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
              cameraOn
                ? "block"
                : "hidden"
            }`}
          />

          {!cameraOn && (
            <span className="text-white text-sm">
              Camera Off
            </span>
          )}

          <button
            onClick={
              cameraOn
                ? stopCamera
                : startCamera
            }
            className="absolute bottom-2 left-2 bg-gray-700/60 text-white p-1 rounded"
          >

            {cameraOn ? (
              <CameraOff />
            ) : (
              <Camera />
            )}

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

          <div className="text-xs text-gray-500 mt-1">
            Session ID: {sessionId}
          </div>

          <div className="w-full h-px bg-gray-200 mt-2"></div>

        </div>
        <div className="flex-1 px-4 flex flex-col gap-4 overflow-y-auto">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "me"
                  ? "items-end"
                  : "items-start"
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

          {isTyping && (

            <div className="flex flex-col items-start">

              <span className="text-xs text-gray-500 mb-1">
                AI Interviewer
              </span>

              <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm rounded-bl-none">

                Typing...

              </div>

            </div>
          )}

        </div>

        <div className="p-3 bg-white flex items-center gap-2 rounded-b-xl">

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 outline-none text-md font-semibold"
          />

          <button
            onClick={sendMessage}
            className="bg-teal-800 text-white p-2 rounded-full hover:bg-teal-900 transition"
          >

            <Send size={18} />

          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatSystem;