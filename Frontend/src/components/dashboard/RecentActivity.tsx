import { CheckCircle, BookOpen, MessageSquare } from "lucide-react";

const activities = [
  {
    type: "solved",
    title: "Solved: Trapping Rain Water",
    subtitle: "Hard • 2 hours ago",
    icon: <CheckCircle size={18} />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    type: "course",
    title: "Completed: Module 4: Ownership in Rust",
    subtitle: "Course: Modern Rust • Yesterday",
    icon: <BookOpen size={18} />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    type: "review",
    title: "Replied to your review",
    subtitle: "Professor Vance • 2 days ago",
    icon: <MessageSquare size={18} />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl w-full h-full flex flex-col gap-5">
      
      <h2 className="text-xl font-semibold">Recent Activity</h2>

      <div className="flex flex-col gap-6">
        {activities.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>
    
            <div className="flex flex-col">
              <p className="font-medium">{item.title}</p>
              <span className="text-sm text-gray-500">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-2 bg-gray-200 hover:bg-gray-300 transition p-3 rounded-xl text-sm font-medium">
        Show All Activity
      </button>
    </div>
  );
};

export default RecentActivity;