export const diffDaysInclusive = (start: Date, end: Date) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const s = new Date(start.setHours(0,0,0,0)).getTime();
  const e = new Date(end.setHours(0,0,0,0)).getTime();
  const days = Math.round((e - s) / msPerDay) + 1;
  return Math.max(days, 1);
};

export const computeTotal = (pricePerDay: number, start?: Date, end?: Date) => {
  if (!start || !end) return 0;
  const days = diffDaysInclusive(start, end);
  return pricePerDay * days;
};
