import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiHeart, FiShield, FiUsers } from 'react-icons/fi';

const items = [
  {
    title: 'Community outreach visit',
    date: 'Upcoming',
    Icon: FiUsers,
    description:
      'Join us as we visit families and deliver support supplies. Check back for the confirmed date and location details.',
  },
  {
    title: 'Prison ministry & reintegration support',
    date: 'Ongoing',
    Icon: FiShield,
    description:
      'Quarterly visits, counselling, and aftercare follow-up for returning citizens and their families.',
  },
  {
    title: 'Youth mentorship & teen mums programme',
    date: 'Ongoing',
    Icon: FiHeart,
    description:
      'Mentorship, guidance, and family follow-up that protects dignity and builds long-term stability.',
  },
];

const statusStyles = {
  Upcoming: 'border-amber-300/50 bg-amber-300/15 text-amber-100',
  Ongoing: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
};

const News = () => {
  return (
    <div className="px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-100">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            News &amp; events
          </span>
          <h1 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1]">
            Updates from the <span className="rwf-gold-text">Foundation</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
            Follow upcoming visits, announcements, and stories from our programmes.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, date, Icon, description }) => (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.09]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-300/10 text-amber-200 transition group-hover:bg-amber-300/20">
                  <Icon aria-hidden="true" />
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${statusStyles[date] || statusStyles.Ongoing}`}
                >
                  <FiCalendar aria-hidden="true" />
                  {date}
                </span>
              </div>
              <h2 className="mt-4 text-base font-semibold leading-snug text-white sm:text-lg">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{description}</p>
            </article>
          ))}
        </div>

        <section className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-300/30 bg-gradient-to-br from-[#2d4f35] via-[#244129] to-[#1a2f1f] px-5 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-semibold text-white">Want to take part in our next visit?</h2>
            <p className="mt-1 text-sm text-white/75">Get in touch to volunteer, partner, or support an upcoming event.</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn--outline !px-5 !py-2.5 !text-sm">
              Contact us
            </Link>
            <Link to="/donate" className="btn btn--gold !px-5 !py-2.5 !text-sm">
              Donate
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;
