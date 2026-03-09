import { AlertTriangle } from "lucide-react";

// linked to the performance chart and shows the result of the selected interview only
const alerts = [
  "Candidate looked away frequently",
  "Multiple faces detected",
  "External voice detected",
];

const CheatingAlerts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Cheating Alerts
      </h3>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-red-500"
          >
            <AlertTriangle size={18} />
            <span>{alert}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheatingAlerts;