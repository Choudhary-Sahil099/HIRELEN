import { Rocket } from "lucide-react";
import Temp from "../../assets/ImageTEmp.png";
import { useNavigate } from "react-router-dom";
const AiSession = () => {
  const navigate = useNavigate();
  return (
    <div className="flex rounded-xl overflow-hidden">
      <div className="w-[70%] bg-gray-100 p-9 max-h-min">
        <div className="max-w-md flex flex-col gap-5">
          <h1 className="text-5xl font-bold text-[#085159]">
            Ready for your next breakthrough?
          </h1>

          <p className="text-gray-600 text-lg font-semibold">
            Launch a high-fidelity AI-powered simulation tailored to your
            specific engineering track.
          </p>

          <button
            className="bg-teal-700 hover:bg-teal-800 font-semibold text-white flex items-center gap-3 px-5 py-3 rounded-xl text-lg w-fit"
          >
            <Rocket className="w-5 h-5 fill-white" />
            Launch AI Session
          </button>
        </div>
      </div>
      <div className="w-[30%] h-79">
        <img
          src={Temp}
          alt="AI"
          className="h-full
           w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AiSession;
