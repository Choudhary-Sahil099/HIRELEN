import { CheckCircle, Clock, XCircle } from "lucide-react";

type StatusType = "success" | "tle" | "error" | "pending";

interface ActivityItemProps {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  time: string;
  runtime?: string;
  status: StatusType;
}

const statusConfig = {
  success: {
    icon: <CheckCircle size={18} />,
    bg: "bg-green-100 text-green-600",
  },
  tle: {
    icon: <Clock size={18} />,
    bg: "bg-yellow-100 text-yellow-600",
  },
  error: {
    icon: <XCircle size={18} />,
    bg: "bg-red-100 text-red-600",
  },
  pending: {
    icon: <Clock size={18} />,
    bg: "bg-gray-100 text-gray-600",
  },
};

const difficultyColor = {
  easy: "text-green-600",
  medium: "text-yellow-600",
  hard: "text-red-600",
};

const ActivityItem = ({
  title,
  difficulty,
  category,
  time,
  runtime,
  status,
}: ActivityItemProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 inter">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${statusConfig[status].bg}`}
        >
          {statusConfig[status].icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            <span className={difficultyColor[difficulty]}>
              {difficulty}
            </span>{" "}
            • {category}
          </p>
        </div>
      </div>

      <div className="text-right text-sm text-gray-600">
        <p>{time}</p>
        {runtime && <p className="text-xs">Runtime: {runtime}</p>}
      </div>
    </div>
  );
};

export default ActivityItem;