export const UPCOMING_PRISON_MINISTRY_EVENTS = [
  {
    id: 'kitale-women-2026-12-16',
    title: 'Prison Ministry — Kitale Women Prison',
    dateLabel: '16th Dec 2026',
    dateISO: '2026-12-16',
    location: 'Kitale Women Prison',
    status: 'Upcoming',
    description:
      'Join our Prison Ministry visit to Kitale Women Prison. We will share essentials, encouragement, and hope with residents and staff.',
  },
  {
    id: 'kitale-men-2027-01-02',
    title: 'Prison Ministry — Kitale Men Prison',
    dateLabel: '2nd Jan 2027',
    dateISO: '2027-01-02',
    location: 'Kitale Men Prison',
    status: 'Upcoming',
    description:
      'Join our Prison Ministry visit to Kitale Men Prison. We will share essentials, counselling support, and encouragement with residents and staff.',
  },
];

/** Returns events that have not yet passed (kept through the end of their event day). */
export function getActivePrisonMinistryEvents(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return UPCOMING_PRISON_MINISTRY_EVENTS.filter((event) => {
    if (!event.dateISO) return true;
    const [year, month, day] = event.dateISO.split('-').map(Number);
    const eventDay = new Date(year, month - 1, day);
    return eventDay >= today;
  });
}
