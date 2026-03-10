import { AlertTriangle } from "lucide-react";

interface Alert {
  message: string;
  severity: "low" | "medium" | "high";
  time: string;
}

const alerts: Alert[] = [
  {
    message: "Candidate looked away frequently",
    severity: "low",
    time: "2 min ago",
  },
  {
    message: "Multiple faces detected",
    severity: "high",
    time: "5 min ago",
  },
  {
    message: "External voice detected",
    severity: "medium",
    time: "7 min ago",
  },
];

const severityColor = {
  low: "text-yellow-500",
  medium: "text-orange-500",
  high: "text-red-500",
};

const CheatingAlerts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-4">
        Cheating Alerts
      </h3>

      <div className="space-y-4">

        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-3">

              <AlertTriangle
                size={18}
                className={severityColor[alert.severity]}
              />

              <div>
                <p className="text-sm font-medium">
                  {alert.message}
                </p>

                <p className="text-xs text-gray-400">
                  {alert.time}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CheatingAlerts;