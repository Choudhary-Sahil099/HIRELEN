import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import InterviewChart from "../../components/charts/InterviewCharts";
import RecentInterviews from "../../components/dashboard/RecentInterviews";
import CheatingAlerts from "../../components/dashboard/CheatingAlerts";
import { motion } from "framer-motion";
import {useState} from 'react';
import type { Interview } from "../../types/interview.types";
import {
  Video,
  Brain,
  AlertTriangle,
  BarChart3
} from "lucide-react";

const interviews: Interview[] = [
  {
    id: 1,
    day: "Mon",
    score: 65,
    alerts: [
      {
        message: "Candidate looked away frequently",
        severity: "low",
        time: "10:12",
      },
    ],
  },
  {
    id: 2,
    day: "Tue",
    score: 82,
    alerts: [
      {
        message: "Multiple faces detected",
        severity: "high",
        time: "11:05",
      },
      {
        message: "External voice detected",
        severity: "medium",
        time: "11:08",
      },
    ],
  },
  {
    id: 3,
    day: "Wed",
    score: 75,
    alerts: [],
  },
  {
    id: 4,
    day: "Thu",
    score: 88,
    alerts: [
      {
        message: "Screen switching detected",
        severity: "medium",
        time: "12:20",
      },
    ],
  },
];
const DashboardPage = () => {
    const [selectedInterview, setSelectedInterview] =useState<Interview | null>(interviews[0] ?? null);

  return (
    <DashboardLayout>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">
            Monitor interviews and AI evaluation
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >

          <StatsCard
            title="Total Interviews"
            value={24}
            icon={<Video />}
          />

          <StatsCard
            title="AI Evaluations"
            value={18}
            icon={<Brain />}
          />

          <StatsCard
            title="Cheating Alerts"
            value={3}
            icon={<AlertTriangle />}
          />

          <StatsCard
            title="Average Score"
            value="82%"
            icon={<BarChart3 />}
          />

        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2">
            <InterviewChart 
            interviews={interviews}
            onSelectInterview={setSelectedInterview}
             />
          </div>

          <CheatingAlerts alerts={selectedInterview?.alerts ?? []} />

        </div>
        <RecentInterviews />

      </motion.div>

    </DashboardLayout>
  );
};

export default DashboardPage;