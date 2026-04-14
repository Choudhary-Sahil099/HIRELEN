import db from "../config/db.js";
import { getLeaderboard } from "./contestScoreService.js";

const getRatingChange = (rank, totalUsers) => {
  const percentile = rank / totalUsers;

  if (percentile <= 0.1) return +50;
  if (percentile <= 0.3) return +30;
  if (percentile <= 0.6) return +10;
  if (percentile <= 0.9) return -10;
  return -30;
};

export const generateContestResults = async (contestId) => {
  const leaderboard = await getLeaderboard(contestId);

  if (!leaderboard || leaderboard.length === 0) {
    console.log("No participants in contest");
    return;
  }

  const totalUsers = leaderboard.length;

  for (let i = 0; i < leaderboard.length; i++) {
    const user = leaderboard[i];
    const rank = i + 1;

    const ratingChange = getRatingChange(rank, totalUsers);

    const [rows] = await db.execute(
      `SELECT rating FROM user_stats WHERE user_id = ?`,
      [user.user_id]
    );

    const currentRating = rows[0]?.rating || 800;
    const newRating = currentRating + ratingChange;
    await db.execute(
      `UPDATE user_stats SET rating = ? WHERE user_id = ?`,
      [newRating, user.user_id]
    );

    console.log(
      `User ${user.user_id} | Rank: ${rank} | Rating: ${currentRating} → ${newRating}`
    );
  }

  console.log("Contest finalized successfully");
};