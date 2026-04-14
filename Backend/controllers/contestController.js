import {
  createContestService,
  joinContestService
} from "../services/contestService.js";

import { getLeaderboard } from "../services/contestScoreService.js";
import { generateContestResults } from "../services/contestResultServices.js";

export const createContest = async (req, res) => {
  try {
    const contestId = await createContestService({
      ...req.body,
      createdBy: req.user.id
    });

    res.json({ contestId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinContest = async (req, res) => {
  try {
    await joinContestService(req.user.id, req.params.id);
    res.json({ message: "Joined contest" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeaderboardController = async (req, res) => {
  try {
    const data = await getLeaderboard(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const finalizeContest = async (req, res) => {
  try {
    const { id } = req.params;

    await generateContestResults(id);

    res.json({ message: "Contest finalized successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};