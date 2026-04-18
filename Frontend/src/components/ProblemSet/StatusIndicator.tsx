export type Status = "solved" | "attempted" | "none";

interface StatusIndicatorProps {
  status?: Status;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status = "none" }) => {
  if (status === "solved") {
    return (
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  }

  if (status === "attempted") {
    return (
      <div className="w-5 h-5 rounded-full border-3 border-yellow-400"></div>
    );
  }
  return <div className="w-5 h-5 rounded-full border-3 border-gray-300" />; 
};

export default StatusIndicator;