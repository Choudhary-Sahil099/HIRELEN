import { createContest, getContestById } from "../models/contest/contestModel.js";
import { joinContest, isUserInContest } from "../models/contest/contestParticipantModel.js";
import { isContestActive } from "../utils/contestUtils.js";

export const createContestService = async (data) => {
  return await createContest(data);
};

export const joinContestService = async (userId, contestId) => {
  await joinContest(userId, contestId);
};

export const validateContest = async (contestId) => {
  const contest = await getContestById(contestId);

  if (!contest) throw new Error("Contest not found");

  if (!isContestActive(contest.start_time, contest.end_time)) {
    throw new Error("Contest not active");
  }

  return contest;
};

export const checkParticipation = async (userId, contestId) => {
  return await isUserInContest(userId, contestId);
};