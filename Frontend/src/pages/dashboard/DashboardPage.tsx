import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatsCard from "../../components/layouts/StatsCard";
import PerformanceChart from "../../components/charts/PerformanceChart";
import {
  Video,
  Brain,
  AlertTriangle,
  BarChart3
} from "lucide-react";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">
          Monitor interviews, AI analysis, and system activity
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Total Interviews"
          value={24}
          icon={<Video size={28} />}
        />

        <StatsCard
          title="AI Evaluations"
          value={18}
          icon={<Brain size={28} />}
        />

        <StatsCard
          title="Cheating Alerts"
          value={3}
          icon={<AlertTriangle size={28} />}
        />

        <StatsCard
          title="Average Score"
          value="82%"
          icon={<BarChart3 size={28} />}
        />

      </div>
        <PerformanceChart />

    </DashboardLayout>
  );
};

export default DashboardPage;