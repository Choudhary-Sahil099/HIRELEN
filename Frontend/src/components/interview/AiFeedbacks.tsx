type FeedbackItemProps = {
  date: string;
  title: string;
  score: string;
  description: string;
};

const FeedbackItem = ({
  date,
  title,
  score,
  description,
}: FeedbackItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{date}</p>
        <span className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-.5 rounded-sm">
          {score}
        </span>
      </div>
      <h4 className="font-semibold text-gray-800">
        {title}
      </h4>
      <p className="text-sm font-semibold text-gray-500">
        {description}
      </p>
    </div>
  );
};

const RecentFeedback = () => {
  return (
    <div className="bg-gray-200 rounded-2xl w-full max-w-sm flex flex-col gap-2">
      <h3 className="text-lg font-semibold">
        Recent Feedback
      </h3>
      <div className="flex flex-col gap-3">
        <FeedbackItem
          date="Yesterday"
          title="Backend Architecture Mock"
          score="8.4/10"
          description="Focus area: Database sharding and consistency models."
        />

        <FeedbackItem
          date="3 days ago"
          title="Leadership & Influence"
          score="7.1/10"
          description="Focus area: Conflict resolution frameworks."
        />

        <FeedbackItem
          date="Oct 18"
          title="Python Core Concepts"
          score="9.0/10"
          description="Focus area: Generators and decorators optimization."
        />
      </div>
      <button className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-xl transition">
        View All Reports
      </button>

    </div>
  );
};

export default RecentFeedback;