const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseISOToMidnight(iso: string) {
  // iso: "YYYY-MM-DD"
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function calcDaysInclusive(from: string | null, to: string | null) {
  if (!from || !to) return 0;
  const start = parseISOToMidnight(from).getTime();
  const end = parseISOToMidnight(to).getTime();
  if (end < start) return 0;

  return Math.floor((end - start) / MS_PER_DAY) + 1;
}
