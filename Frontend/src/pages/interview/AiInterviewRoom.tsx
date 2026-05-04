import AiRoomNav from "../../components/interview/AIRoom/AiRoomNav";
import ChatSystem from "../../components/interview/AIRoom/ChatSystem";
import CodeEditor from "../../components/interview/AIRoom/CodeEditor";

const AiInterviewRoom = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      <AiRoomNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[70%] overflow-y-auto no-scrollbar">
          <CodeEditor  />
        </div>
        <div className="w-[30%]">
          <ChatSystem />
        </div>

      </div>
    </div>
  );
};

export default AiInterviewRoom;