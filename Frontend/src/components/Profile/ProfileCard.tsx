import { CheckCircle, Globe, BarChart } from "lucide-react";
import type { ReactNode } from "react";

type IconType = "solved" | "rank" | "winrate";
type ColorType = "blue" | "orange" | "cyan";

interface ProfileCardProps {
  icon: IconType;
  color: ColorType;
  label: string;
  value: string | number;
  topRightText?: string;
  subtitle?: string;
}

const iconMap: Record<IconType, ReactNode> = {
  solved: <CheckCircle size={20} />,
  rank: <Globe size={20} />,
  winrate: <BarChart size={20} />,
};

const colorMap: Record<ColorType, string> = {
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
  cyan: "bg-cyan-100 text-cyan-600",
};

const ProfileCard = ({
  icon,
  color,
  label,
  value,
  topRightText,
  subtitle,
}: ProfileCardProps) => {
  return (
    <div className="relative bg-gray-100 rounded-2xl p-6 w-full">
      
      {topRightText && (
        <p className="absolute top-6 right-6 text-sm text-teal-900 font-semibold ">
          {topRightText}
        </p>
      )}

      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl ${colorMap[color]}`}
      >
        {iconMap[icon]}
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
          {label}
        </p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      {subtitle && (
        <p className="absolute bottom-4 right-4 text-sm font-medium text-gray-700">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ProfileCard;