import { format, eachDayOfInterval, getDay } from "date-fns";
import { useEffect, useState } from "react";

type DayData = {
  date: Date;
  count: number;
};

const getColor = (count: number, isStreak: boolean) => {
  if (isStreak) return "bg-orange-500";
  if (count === 0) return "bg-gray-300";
  if (count < 2) return "bg-teal-300";
  if (count < 4) return "bg-teal-600";
  return "bg-teal-800";
};

const SubmissionHeatmap = () => {
  const [allDays, setAllDays] = useState<DayData[]>([]);
  const [streakDates, setStreakDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/activity/heatmap", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const heatmapData = data.data.heatmap;
        const streak = data.data.streakDates || [];

        setStreakDates(streak);
        const activityMap: Record<string, number> = {};

        heatmapData.forEach((item: any) => {
          activityMap[item.date] = item.count;
        });

        const today = new Date();

        const startDate = new Date();
        startDate.setDate(today.getDate() - 364);

        const days = eachDayOfInterval({
          start: startDate,
          end: today,
        }).map((date) => {
          const key = format(date, "yyyy-MM-dd");

          return {
            date,
            count: activityMap[key] || 0,
          };
        });
        setAllDays(days);
      } catch (err) {
        console.error("Heatmap Error:", err);
      }
    };

    fetchHeatmap();
  }, []);

  const streakSet = new Set(streakDates);

  const groupedByMonth = allDays.reduce(
    (acc, item) => {
      const monthKey = format(item.date, "yyyy-MM");

      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push(item);

      return acc;
    },
    {} as Record<string, DayData[]>,
  );
  const sortedMonths = Object.entries(groupedByMonth).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div className="p-4 rounded-2xl shadow-lg inter">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-black">
          Submission Activity
        </h3>
        <span className="text-sm text-black">Last 1 year</span>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex gap-4">
          {sortedMonths.map(([monthKey, days]) => {
            const firstDay = getDay(days[0].date);

            return (
              <div
                key={monthKey}
                className="flex flex-col items-center shrink-0"
              >
                <div className="grid grid-rows-7 grid-flow-col gap-0.75">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5" />
                  ))}

                  {days.map((day, i) => {
                    const key = format(day.date, "yyyy-MM-dd");
                    const isStreak = streakSet.has(key);

                    return (
                      <div
                        key={i}
                        title={`${day.count} submissions on ${format(
                          day.date,
                          "dd MMM yyyy",
                        )}${isStreak ? " 🔥 streak" : ""}`}
                        className={`w-3.25 h-3.25 rounded-sm transition-all duration-200 hover:scale-125 ${getColor(
                          day.count,
                          isStreak,
                        )}`}
                      />
                    );
                  })}
                </div>

                <span className="text-xs text-gray-700 mt-2">
                  {" "}
                  {format(new Date(monthKey + "-01"), "MMM")}{" "}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-800">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-200 rounded-sm" />
        <div className="w-3 h-3 bg-teal-300 rounded-sm" />
        <div className="w-3 h-3 bg-teal-600 rounded-sm" />
        <div className="w-3 h-3 bg-teal-800 rounded-sm" />
        <div className="w-3 h-3 bg-orange-500 rounded-sm" />
        <span>More</span>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
