import type { Interview } from "../../types/interview.types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  interviews: Interview[];
  onSelectInterview: (interview: Interview) => void;
}

const InterviewChart = ({ interviews, onSelectInterview }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Interview Performance</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={interviews} className="outline-none">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={3}
            dot={(props: any) => {
              const { cx, cy, payload } = props;

              return (
                <g>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={14}
                    fill="transparent"
                    style={{ cursor: "pointer",outline:"none" }}
                    onClick={() => {
                      console.log("Clicked interview:", payload);
                      onSelectInterview(payload);
                    }}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#6366f1"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    pointerEvents="none"
                  />
                </g>
              );
            }}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterviewChart;
