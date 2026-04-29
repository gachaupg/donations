import React from 'react';

const News = () => {
  const items = [
    {
      title: 'Community outreach visit',
      date: 'Upcoming',
      description:
        'Join us as we visit families and deliver support supplies. Check back for the confirmed date and location details.',
    },
    {
      title: 'Prison ministry & reintegration support',
      date: 'Ongoing',
      description:
        'Quarterly visits, counselling, and aftercare follow-up for returning citizens and their families.',
    },
    {
      title: 'Youth mentorship & teen mums programme',
      date: 'Ongoing',
      description:
        'Mentorship, guidance, and family follow-up that protects dignity and builds long-term stability.',
    },
  ];

  return (
    <div className="py-12 px-4 text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            News & events
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Updates from the Foundation</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
            Follow upcoming visits, announcements, and stories from our programmes.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-200">
                {item.date}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

