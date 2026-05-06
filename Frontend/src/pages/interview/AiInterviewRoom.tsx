import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AiRoomNav from "../../components/interview/AIRoom/AiRoomNav";
import ChatSystem from "../../components/interview/AIRoom/ChatSystem";
import CodeEditor from "../../components/interview/AIRoom/CodeEditor";

const AiInterviewRoom = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [question, setQuestion] = useState<any>(null);
  const [code, setCode] = useState("");
  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/interview/${sessionId}/question`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      setQuestion(data);

      if (data?.data?.starter_code_cpp) {
        setCode(data.data.starter_code_cpp);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchQuestion();
    }
  }, [sessionId]);

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      <AiRoomNav />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[70%] overflow-y-auto no-scrollbar">
          <CodeEditor
            question={question}
            code={code}
            setCode={setCode}
            sessionId={sessionId || ""}
            fetchQuestion={fetchQuestion}
          />
        </div>

        <div className="w-[30%]">
          <ChatSystem />
        </div>
      </div>
    </div>
  );
};

export default AiInterviewRoom;
