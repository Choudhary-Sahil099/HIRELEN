import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

//temporary data for the frontend responce 
const data = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 80 },
  { day: "Wed", score: 65 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 76 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 84 }
];

const PerformanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h3 className="text-lg font-semibold mb-4">
        Interview Performance
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#4f46e5"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;