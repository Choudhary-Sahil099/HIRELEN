import StatusIndicator from "./StatusIndicator";
import type { Status } from "./StatusIndicator";
import { useNavigate } from "react-router-dom";

export interface ProblemRowProps {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  acceptance: string;
  status?: Status;
  tags?: string[];
}

const ProblemRow: React.FC<ProblemRowProps> = ({
  id,
  title,
  difficulty,
  acceptance,
  status = "none",
  tags = [],
}) => {
  const navigate = useNavigate();
  const normalized = difficulty.toUpperCase();

  const color =
    normalized === "EASY"
      ? "text-green-600 bg-green-200 w-12 px-2 py-1 rounded-lg text-center"
      : normalized === "MEDIUM"
      ? "text-yellow-600 bg-yellow-100 w-20 px-2 py-1 rounded-lg text-center"
      : "text-red-600 bg-red-100 w-12 px-2 py-1 rounded-lg text-center";
  const visibleTags = tags.slice(0, 2);
  const remaining = tags.length - visibleTags.length;

  return (
    <div
      className="grid grid-cols-[120px_1fr_140px_130px_160px] 
                 border-b border-gray-100 items-start
                 hover:bg-gray-50 transition-colors p-4 cursor-pointer inter"
      onClick={() => navigate(`/problems/${id}`)}
    >
      <div className="flex items-start">
        <StatusIndicator status={status} />
      </div>
      <div className="font-medium text-left">{title}</div>
      <div className={`${color} text-[10px] font-semibold`}>
        {normalized}
      </div>
      <div className="text-gray-500 text-sm font-semibold">
        {acceptance}
      </div>
      <div className="text-gray-400 text-sm flex items-center gap-2">
        {visibleTags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-semibold whitespace-nowrap"
          >
            {tag}
          </span>
        ))}

        {remaining > 0 && (
          <span
            className="text-xs text-gray-500 font-semibold"
            onClick={(e) => e.stopPropagation()} 
          >
            +{remaining}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProblemRow;