import React from 'react';
import bridgeworks from '../assets/sponsors/bridgeworks-logo.jpg';

const PARTNERS = [
  {
    name: 'Bridgeworks Network Ltd',
    href: 'https://bridgeworksnetwork.org.au/',
    logo: bridgeworks,
    blurb:
      'An Australian ACNC-registered charity partnering with us to restore hope for communities impacted by incarceration.',
  },
];

export default function PartnersSection({
  title = 'Our Partners',
  subtitle = 'Organisations we work alongside to extend care across borders.',
  className = '',
}) {
  return (
    <section className={`py-4 sm:py-6 ${className}`}>
      <header className="mb-4 text-center sm:mb-5">
        <h2 className="mb-3 text-2xl font-semibold text-white">{title}</h2>
        <p className="text-base text-white/80">{subtitle}</p>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-4 px-1 sm:gap-5">
        {PARTNERS.map((partner) => (
          <a
            key={partner.href}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 sm:flex-row sm:text-left"
          >
            <div className="flex h-24 w-full max-w-[11rem] shrink-0 items-center justify-center rounded-xl bg-white p-3 sm:h-28 sm:w-40">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 space-y-1.5">
              <p className="text-lg font-semibold text-white">{partner.name}</p>
              <p className="text-sm leading-relaxed text-white/75">{partner.blurb}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
                Visit partner site →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
