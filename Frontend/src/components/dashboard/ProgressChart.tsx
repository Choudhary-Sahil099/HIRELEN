import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Cell,
} from "recharts";

const data = [
  { day: "MON", value: 20 },
  { day: "TUE", value: 40 },
  { day: "WED", value: 80 },
  { day: "THU", value: 60 },
  { day: "FRI", value: 30 },
  { day: "SAT", value: 70 },
  { day: "SUN", value: 35 },
  { day: "MON", value: 55 },
  { day: "TUE", value: 90 },
  { day: "WED", value: 45 },
];

const FocusChart = () => {
  return (
    <div className="bg-white p-9 rounded-xl w-full h-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold text-[#09474e]">
            Focus Proficiency
          </h2>
          <p className="text-sm text-gray-500">
            Time spent vs. problem difficulty
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-[#0e6f7a]"></span>
          This Month
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value < 50 ? "#9ca3af" : "#0e6f7a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FocusChart;
