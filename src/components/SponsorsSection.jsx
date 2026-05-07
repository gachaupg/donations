import React, { useState } from 'react';

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
import millysWellness from '../assets/sponsors/millys-wellness.png';
import runLikeKenyanLogo from '../assets/sponsors/run-like-a-kenyan-logo.png';
import runLikeKenyanPosterOne from '../assets/sponsors/run-like-a-kenyan-poster-1.png';
import runLikeKenyanPosterTwo from '../assets/sponsors/run-like-a-kenyan-poster-2.png';
import almondskillsPrograms from '../assets/sponsors/almondskills-programs.png';

const SPONSOR_LOGOS = [
  {
    src: carebility,
    alt: 'Carebility Z Option Inc. logo',
    href: 'https://carebilityzoption.org.au/',
  },
  {
    src: runLikeKenyanLogo,
    alt: 'Run Like a Kenyan Melbourne logo',
    previewTitle: 'Run Like a Kenyan Melbourne',
    gallery: [runLikeKenyanPosterOne, runLikeKenyanPosterTwo],
  },
  { src: safiServices, alt: 'Safi Services logo' },
  {
    src: blessingTransporters,
    alt: 'Blessing Transporters logo',
    href: 'https://www.blessingstransporters.co.ke/',
  },
  { src: millysWellness, alt: "Milly's Wellness logo" },
  {
    src: barkay,
    alt: 'Barkay International logo',
    href: 'https://www.barkayinternational.com',
  },
  { src: diamond, alt: 'Sponsor logo' },
  {
    src: almondskills,
    alt: 'AlmondSkills Consultants logo',
    previewTitle: 'AlmondSkills Consultants',
    gallery: [almondskillsPrograms],
  },
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
  const [activeSponsor, setActiveSponsor] = useState(null);
  const closePreview = () => setActiveSponsor(null);
  const getSponsorGallery = (logo) => (logo.gallery?.length ? logo.gallery : [logo.src]);
  const openSponsorPreview = (logo) => {
    setActiveSponsor({
      ...logo,
      previewTitle: logo.previewTitle || logo.alt || 'Sponsor',
      gallery: getSponsorGallery(logo),
    });
  };

  const renderSponsorImage = (logo, className) => (
    <img src={logo.src} alt={logo.alt} className={className} loading="lazy" />
  );

  const renderSponsorContent = (logo, className) => {
    if (logo.gallery?.length || !logo.href) {
      return (
        <button
          type="button"
          onClick={() => openSponsorPreview(logo)}
          className="inline-flex items-center justify-center"
          aria-label={`View ${logo.previewTitle || logo.alt || 'sponsor'}`}
        >
          {renderSponsorImage(logo, className)}
        </button>
      );
    }

    if (logo.href) {
      return (
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={logo.alt}
          className="inline-flex items-center justify-center"
        >
          {renderSponsorImage(logo, className)}
        </a>
      );
    }

    return renderSponsorImage(logo, className);
  };

  return (
    <section className={`py-4 sm:py-6 ${className}`}>
      <header className="mb-4 text-center sm:mb-5">
        <h2 className="mb-3 text-2xl font-semibold text-white">{title}</h2>
        <p className="text-base text-white/80">{subtitle}</p>
      </header>

      {/* Small screens: two logos per row, no horizontal scroll */}
      <div className="md:hidden">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 px-1 sm:max-w-3xl sm:gap-5">
          {SPONSOR_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
            >
              {renderSponsorContent(
                logo,
                'h-14 w-full max-w-[14rem] object-contain opacity-95 sm:h-16 sm:max-w-[16rem]'
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="sponsors-marquee hidden md:block">
        <div className="sponsors-marquee__track" aria-label="Sponsors marquee">
          <div className="sponsors-marquee__set">
            {SPONSOR_LOGOS.map((logo) => (
              <React.Fragment key={logo.src}>
                {renderSponsorContent(logo, 'sponsors-marquee__logo')}
              </React.Fragment>
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

      {activeSponsor ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeSponsor.previewTitle || activeSponsor.alt}
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-slate-950 p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close sponsor preview"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 text-xl font-semibold leading-none text-white transition hover:bg-black/80"
            >
              &times;
            </button>
            <p className="mb-3 pr-10 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 sm:mb-4 sm:text-sm">
              {activeSponsor.previewTitle}
            </p>
            <div className="grid max-h-[72vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 sm:gap-4">
              {activeSponsor.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${activeSponsor.previewTitle} poster`}
                  className="mx-auto h-auto max-h-[58vh] w-full max-w-[280px] rounded-xl border border-white/10 object-contain sm:max-w-[320px]"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

