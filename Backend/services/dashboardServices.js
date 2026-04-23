import { getUserSubmissions } from "../models/submission/subModel.js";
import { getUserStats } from "../models/user/userStatsModel.js";

export const getDashboardData = async (userId) => {
  const submissions = await getUserSubmissions(userId, 50);
  const activities = submissions.slice(0, 5).map((s) => ({
    type: "solved",
    title: `Solved: ${s.title}`,
    subtitle: `${s.status} • ${new Date(s.created_at).toLocaleDateString()}`
  }));
  const daysMap = {
    SUN: 0, MON: 0, TUE: 0, WED: 0,
    THU: 0, FRI: 0, SAT: 0
  };

  submissions.forEach((s) => {
    const day = new Date(s.created_at)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    if (daysMap[day] !== undefined) {
      daysMap[day]++;
    }
  });

  const focusData = Object.entries(daysMap).map(([day, value]) => ({
    day,
    value
  }));
  const stats = await getUserStats(userId);

  return {
    activities,
    focusData,
    streak: stats?.current_streak || 0,
    maxStreak: stats?.max_streak || 0,
  };
};