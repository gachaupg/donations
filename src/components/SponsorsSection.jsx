import React from 'react';

import barkay from '../assets/sponsors/barkay.png';
import diamond from '../assets/sponsors/diamond.png';
import almondskills from '../assets/sponsors/almondskills.png';
import twoStars from '../assets/sponsors/2stars.png';
import bridgeworks from '../assets/sponsors/bridgeworks.png';
import deliverance from '../assets/sponsors/deliverance.png';
import aufrican from '../assets/sponsors/aufrican.png';
import carebility from '../assets/sponsors/carebility.png';
import safiServices from '../assets/sponsors/safi-services.png';
import blessingTransporters from '../assets/sponsors/blessing-transporters.png';

const SPONSOR_LOGOS = [
  {
    src: carebility,
    alt: 'Carebility Z Option Inc. logo',
    href: 'https://carebilityzoption.org.au/',
  },
  { src: safiServices, alt: 'Safi Services logo' },
  {
    src: blessingTransporters,
    alt: 'Blessing Transporters logo',
    href: 'https://www.blessingstransporters.co.ke/',
  },
  { src: barkay, alt: 'Sponsor logo' },
  { src: diamond, alt: 'Sponsor logo' },
  { src: almondskills, alt: 'Sponsor logo' },
  { src: twoStars, alt: 'Sponsor logo' },
  { src: bridgeworks, alt: 'Sponsor logo' },
  { src: deliverance, alt: 'Sponsor logo' },
  { src: aufrican, alt: 'Sponsor logo' },
];

export default function SponsorsSection({
  title = 'Our Sponsors',
  subtitle = 'We are grateful to our sponsors who make our work possible.',
  className = '',
}) {
  return (
    <section className={`py-4 sm:py-6 ${className}`}>
      <header className="mb-4 text-center sm:mb-5">
        <h2 className="mb-3 text-2xl font-semibold text-white">{title}</h2>
        <p className="text-base text-white/80">{subtitle}</p>
      </header>

      {/* Small screens: two logos per row, no horizontal scroll */}
      <div className="md:hidden">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 px-1 min-[420px]:grid-cols-2 sm:max-w-3xl sm:gap-5">
          {SPONSOR_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.alt}
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-14 w-full max-w-[14rem] object-contain opacity-95 sm:h-16 sm:max-w-[16rem]"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-14 w-full max-w-[14rem] object-contain opacity-95 sm:h-16 sm:max-w-[16rem]"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sponsors-marquee hidden md:block">
        <div className="sponsors-marquee__track" aria-label="Sponsors marquee">
          <div className="sponsors-marquee__set">
            {SPONSOR_LOGOS.map((logo) =>
              logo.href ? (
                <a
                  key={logo.src}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.alt}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="sponsors-marquee__logo"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="sponsors-marquee__logo"
                  loading="lazy"
                />
              )
            )}
          </div>
          <div className="sponsors-marquee__set" aria-hidden="true">
            {SPONSOR_LOGOS.map((logo) => (
              <img
                key={`dup-${logo.src}`}
                src={logo.src}
                alt=""
                className="sponsors-marquee__logo"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

