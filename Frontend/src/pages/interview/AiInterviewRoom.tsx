import AiRoomNav from "../../components/interview/AIRoom/AiRoomNav"
import CodeEditor from "../../components/interview/AIRoom/CodeEditor"

const AiInterviewRoom = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <AiRoomNav/>
      <div className="flex">
        <CodeEditor/>
        
      </div>
    </div>
  )
}

export default AiInterviewRoom
