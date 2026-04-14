export const isContestActive = (start, end) => {
  const now = new Date();
  return now >= new Date(start) && now <= new Date(end);
};