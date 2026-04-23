import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Cell,
} from "recharts";

const FocusChart = ({ data = [] }: any) => {

  if (!data.length) {
    return (
      <div className="bg-white p-9 rounded-xl w-full h-full flex items-center justify-center">
        <p className="text-gray-400">No activity data available</p>
      </div>
    );
  }

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
            {data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value < 5 ? "#9ca3af" : "#0e6f7a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FocusChart;