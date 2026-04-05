import {
  format,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay
} from "date-fns";

type DayData = {
  date: Date;
  count: number;
};

const today = new Date();

const allDays: DayData[] = eachDayOfInterval({
  start: startOfYear(today),
  end: endOfYear(today),
}).map((date) => ({
  date,
  count: Math.floor(Math.random() * 5),
}));

const getColor = (count: number) => {
  if (count === 0) return "bg-gray-800";  
  if (count < 2) return "bg-blue-800";
  if (count < 4) return "bg-blue-500";
  return "bg-blue-300";
};

const groupedByMonth = allDays.reduce((acc, item) => {
  const monthKey = format(item.date, "MMM");

  if (!acc[monthKey]) acc[monthKey] = [];
  acc[monthKey].push(item);

  return acc;
}, {} as Record<string, DayData[]>);

const SubmissionHeatmap = () => {
  return (
    <div className="bg-[#0f172a] p-4 rounded-2xl shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">
          Submission Activity
        </h3>
        <span className="text-sm text-gray-400">
          Last 1 year
        </span>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex gap-4">

          {Object.entries(groupedByMonth).map(([month, days]) => {
            const firstDay = getDay(days[0].date);

            return (
              <div key={month} className="flex flex-col items-center shrink-0">
                <div className="grid grid-rows-7 grid-flow-col gap-0.75">

                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5" />
                  ))}

                  {days.map((day, i) => (
                    <div
                      key={i}
                      title={`${format(day.date, "dd MMM yyyy")} - ${day.count}`}
                      className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 ${getColor(day.count)}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 mt-2">
                  {month}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-800 rounded-sm" />
        <div className="w-3 h-3 bg-blue-800 rounded-sm" />
        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
        <div className="w-3 h-3 bg-blue-300 rounded-sm" />
        <span>More</span>
      </div>

    </div>
  );
};

export default SubmissionHeatmap;