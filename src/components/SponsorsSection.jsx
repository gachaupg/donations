import React from 'react';

import barkay from '../assets/sponsors/barkay.png';
import diamond from '../assets/sponsors/diamond.png';
import almondskills from '../assets/sponsors/almondskills.png';
import twoStars from '../assets/sponsors/2stars.png';
import bridgeworks from '../assets/sponsors/bridgeworks.png';
import deliverance from '../assets/sponsors/deliverance.png';
import aufrican from '../assets/sponsors/aufrican.png';

const SPONSOR_LOGOS = [
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
    <section className={`py-6 sm:py-10 ${className}`}>
      <header className="mb-6 text-center sm:mb-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">{title}</h2>
        <p className="text-base text-white/80">{subtitle}</p>
      </header>

      <div className="sponsors-marquee">
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

