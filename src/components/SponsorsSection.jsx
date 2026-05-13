import React, { useEffect, useState } from 'react';

import barkay from '../assets/sponsors/barkay.png';
import diamond from '../assets/sponsors/diamond.png';
import almondskills from '../assets/sponsors/almondskills.png';
import twoStars from '../assets/sponsors/2stars.png';
import bridgeworks from '../assets/sponsors/bridgeworks.png';
import deliverance from '../assets/sponsors/deliverance.png';
import carebility from '../assets/sponsors/carebility.png';
import safiServices from '../assets/sponsors/safi-services.png';
import blessingTransporters from '../assets/sponsors/blessing-transporters.png';
import millysWellness from '../assets/sponsors/millys-wellness.png';
import runLikeKenyanLogo from '../assets/sponsors/run-like-a-kenyan-logo.png';
import runLikeKenyanPosterOne from '../assets/sponsors/run-like-a-kenyan-poster-1.png';
import runLikeKenyanPosterTwo from '../assets/sponsors/run-like-a-kenyan-poster-2.png';
import almondskillsPrograms from '../assets/sponsors/almondskills-programs.png';
import aufricanCateringPoster from '../assets/sponsors/aufrican-catering-poster.png';
import aufricanCateringPosterTwo from '../assets/sponsors/aufrican-catering-poster-2.png';
import bridgeworksProfile from '../assets/sponsors/bridgeworks-profile.pdf?url';

const SPONSOR_LOGOS = [
  {
    src: carebility,
    alt: '',
    href: 'https://carebilityzoption.org.au/',
  },
  {
    src: runLikeKenyanLogo,
    alt: '',
    previewTitle: '',
    gallery: [runLikeKenyanPosterOne, runLikeKenyanPosterTwo],
  },
  { src: safiServices, alt: '' },
  {
    src: blessingTransporters,
    alt: '',
    href: 'https://www.blessingstransporters.co.ke/',
  },
  { src: millysWellness, alt: "" },
  {
    src: barkay,
    alt: '',
    href: 'https://www.barkayinternational.com',
  },
  { src: diamond, alt: '' },
  {
    src: almondskills,
    alt: '',
    previewTitle: '',
    gallery: [almondskillsPrograms],
  },
  { src: twoStars, alt: '' },
  {
    src: bridgeworks,
    alt: '',
    previewTitle: 'Bridgeworks Network Limited',
    pdf: bridgeworksProfile,
  },
  { src: deliverance, alt: '' },
  {
    src: aufricanCateringPoster,
    alt: '',
    previewTitle: '',
    gallery: [aufricanCateringPoster, aufricanCateringPosterTwo],
  },
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
      gallery: logo.pdf ? [] : getSponsorGallery(logo),
    });
  };

  useEffect(() => {
    if (!activeSponsor) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') closePreview();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeSponsor]);

  const renderSponsorImage = (logo, className) => (
    <img src={logo.src} alt={logo.alt} className={className} loading="lazy" />
  );

  const renderSponsorContent = (logo, className) => {
    if (logo.gallery?.length || logo.pdf || !logo.href) {
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md animate-modal-fade sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeSponsor.previewTitle || activeSponsor.alt}
          onClick={closePreview}
        >
          <div
            className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-2xl shadow-black/60 ring-1 ring-white/5 animate-modal-pop ${
              activeSponsor.pdf ? 'max-w-5xl' : 'max-w-3xl'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 p-1.5 sm:h-11 sm:w-11">
                  <img
                    src={activeSponsor.src}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white sm:text-base">
                    {activeSponsor.previewTitle}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80 sm:text-xs">
                    {activeSponsor.pdf ? 'Company profile' : 'Gallery'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePreview}
                aria-label="Close sponsor preview"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 transition hover:scale-105 hover:bg-white/[0.14] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/60 sm:h-10 sm:w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeSponsor.pdf ? (
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-inner">
                    <iframe
                      src={activeSponsor.pdf}
                      title={`${activeSponsor.previewTitle} profile`}
                      className="h-[68vh] w-full sm:h-[72vh]"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-white/55 sm:text-sm">
                      Having trouble viewing? Open the file directly.
                    </p>
                    <a
                      href={activeSponsor.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open PDF in new tab
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeSponsor.gallery.map((image) => (
                    <div
                      key={image}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-2 transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <img
                        src={image}
                        alt={`${activeSponsor.previewTitle} poster`}
                        className="mx-auto h-auto max-h-[60vh] w-full rounded-xl object-contain transition duration-300 group-hover:scale-[1.01]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

