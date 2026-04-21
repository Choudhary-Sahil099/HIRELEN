export const fillMissingDates = (data) => {
  const map = new Map(
    data.map(d => [
      new Date(d.date).toLocaleDateString("en-CA"),
      d.count
    ])
  );

  const result = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const dateStr = d.toLocaleDateString("en-CA");

    result.push({
      date: dateStr,
      count: map.get(dateStr) || 0
    });
  }

  return result;
};

export const calculateStreaks = (heatmap) => {
  let current = 0;
  let max = 0;

  let streakDates = [];

  const today = new Date().toLocaleDateString("en-CA");
  const activityMap = new Map();

  heatmap.forEach((day) => {
    activityMap.set(day.date, day.count);
  });
  let tempDate = new Date();

  while (true) {
    const key = tempDate.toLocaleDateString("en-CA");

    if (activityMap.get(key) > 0) {
      current++;
      streakDates.push(key);
    } else {
      break;
    }

    tempDate.setDate(tempDate.getDate() - 1);
  }
  let temp = 0;

  for (let i = 0; i < heatmap.length; i++) {
    if (heatmap[i].count > 0) {
      temp++;
      max = Math.max(max, temp);
    } else {
      temp = 0;
    }
  }

  return {
    current,
    max,
    streakDates,
  };
};