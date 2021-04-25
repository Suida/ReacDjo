import dayjs from 'dayjs';

export const withWidth = (n: number, l?: number) => n.toString().padStart(l === undefined? 2: l, '0');

export const formatDateTime = (d: dayjs.Dayjs) => (
  `${withWidth(d.hour())}:${withWidth(d.minute())}, ` +
  `${d.year()}-${withWidth(d.month() + 1)}-${withWidth(d.date())}`
)
