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

export const calculateStreaks = (data) => {
  let current = 0, max = 0, temp = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].count > 0) {
      temp++;
      max = Math.max(max, temp);
    } else {
      temp = 0;
    }
  }

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) current++;
    else break;
  }

  return { current, max };
};