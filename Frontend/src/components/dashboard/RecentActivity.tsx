import { CheckCircle, BookOpen, MessageSquare } from "lucide-react";

const RecentActivity = ({ activities }: any) => {
  const getStyles = (type: string) => {
    switch (type) {
      case "solved":
        return {
          icon: <CheckCircle size={18} />,
          bg: "bg-green-100",
          color: "text-green-600",
        };
      case "course":
        return {
          icon: <BookOpen size={18} />,
          bg: "bg-blue-100",
          color: "text-blue-600",
        };
      case "review":
        return {
          icon: <MessageSquare size={18} />,
          bg: "bg-yellow-100",
          color: "text-yellow-600",
        };
      default:
        return {
          icon: <CheckCircle size={18} />,
          bg: "bg-gray-100",
          color: "text-gray-600",
        };
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl w-full h-full flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Recent Activity</h2>

      <div className="flex flex-col gap-6">
        {activities.slice(0, 4).map((item: any, index: number) => {
          const styles = getStyles(item.type);

          return (
            <div key={index} className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${styles.bg} ${styles.color}`}>
                {styles.icon}
              </div>

              <div className="flex flex-col">
                <p className="font-medium">{item.title}</p>
                <span className="text-sm text-gray-500">{item.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-auto bg-gray-200 hover:bg-gray-300 transition p-3 rounded-xl text-sm font-medium">
        Show All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
