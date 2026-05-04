import React from 'react';

import barkay from '../assets/sponsors/barkay.png';
import diamond from '../assets/sponsors/diamond.png';
import almondskills from '../assets/sponsors/almondskills.png';
import twoStars from '../assets/sponsors/2stars.png';
import bridgeworks from '../assets/sponsors/bridgeworks.png';
import deliverance from '../assets/sponsors/deliverance.png';
import aufrican from '../assets/sponsors/aufrican.png';
import carebility from '../assets/sponsors/carebility.png';

const SPONSOR_LOGOS = [
  { src: carebility, alt: 'Carebility Z Option Inc. logo' },
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
        <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-12 justify-items-center px-1 sm:max-w-3xl sm:gap-x-10 sm:gap-y-14">
          {SPONSOR_LOGOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-[4.5rem] w-full max-w-[16rem] object-contain opacity-95 sm:h-20 sm:max-w-[18.5rem]"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="sponsors-marquee hidden md:block">
        <div className="sponsors-marquee__track" aria-label="Sponsors marquee">
          <div className="sponsors-marquee__set">
            {SPONSOR_LOGOS.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className="sponsors-marquee__logo"
                loading="lazy"
              />
            ))}
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

