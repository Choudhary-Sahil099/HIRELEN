import { AlertTriangle } from "lucide-react";
import type { Alert } from "../../types/interview.types";

interface Props {
  alerts: Alert[];
}

const severityColor: Record<Alert["severity"], string> = {
  low: "text-yellow-500",
  medium: "text-orange-500",
  high: "text-red-500",
};

const CheatingAlerts = ({ alerts }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-4">
        Cheating Alerts
      </h3>

      {alerts.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No cheating alerts detected in this interview.
        </p>
      ) : (
        <div className="space-y-3">

          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
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
          ))}

        </div>
      )}

    </div>
  );
};

export default CheatingAlerts;