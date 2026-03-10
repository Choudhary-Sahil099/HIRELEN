import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import InterviewChart from "../../components/charts/InterviewCharts";
import RecentInterviews from "../../components/dashboard/RecentInterviews";
import CheatingAlerts from "../../components/dashboard/CheatingAlerts";

import { motion } from "framer-motion";

import {
  Video,
  Brain,
  AlertTriangle,
  BarChart3
} from "lucide-react";

const DashboardPage = () => {
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
            <InterviewChart />
          </div>

          <CheatingAlerts />

        </div>
        <RecentInterviews />

      </motion.div>

    </DashboardLayout>
  );
};

export default DashboardPage;