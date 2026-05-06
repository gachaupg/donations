import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import image1 from '../assets/Image_1.jpeg';
import image2 from '../assets/image_2.jpeg';
import image3 from '../assets/image_3.jpeg';
import image4 from '../assets/image_4.jpeg';
import image5 from '../assets/image_5.jpeg';
import image6 from '../assets/image_6.jpeg';
import image7 from '../assets/image_7.jpeg';
import image8 from '../assets/image_8.jpeg';
import image9 from '../assets/image_9.jpeg';
import image10 from '../assets/image_10.jpeg';
import galleryRwfTeam from '../assets/gallery/gallery-rwf-team.png';
import galleryMattressDonation from '../assets/gallery/gallery-mattress-donation.png';
import galleryExtra01 from '../assets/gallery/gallery-extra-01.png';
import galleryExtra02 from '../assets/gallery/gallery-extra-02.png';
import galleryExtra03 from '../assets/gallery/gallery-extra-03.png';
import galleryExtra04 from '../assets/gallery/gallery-extra-04.png';
import galleryExtra05 from '../assets/gallery/gallery-extra-05.png';
import galleryExtra06 from '../assets/gallery/gallery-extra-06.png';
import galleryExtra07 from '../assets/gallery/gallery-extra-07.png';
import galleryExtra08 from '../assets/gallery/gallery-extra-08.png';
import galleryExtra09 from '../assets/gallery/gallery-extra-09.png';
import galleryExtra10 from '../assets/gallery/gallery-extra-10.png';
import galleryExtra11 from '../assets/gallery/gallery-extra-11.png';
import galleryExtra12 from '../assets/gallery/gallery-extra-12.png';
import galleryExtra13 from '../assets/gallery/gallery-extra-13.png';
import galleryExtra14 from '../assets/gallery/gallery-extra-14.png';
import galleryExtra15 from '../assets/gallery/gallery-extra-15.png';
import galleryExtra16 from '../assets/gallery/gallery-extra-16.png';

const LOCAL_GALLERY_IMAGES = [
  galleryRwfTeam,
  galleryMattressDonation,
  galleryExtra01,
  galleryExtra02,
  galleryExtra03,
  galleryExtra04,
  galleryExtra05,
  galleryExtra06,
  galleryExtra07,
  galleryExtra08,
  galleryExtra09,
  galleryExtra10,
  galleryExtra11,
  galleryExtra12,
  galleryExtra13,
  galleryExtra14,
  galleryExtra15,
  galleryExtra16,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

/** New on-site photos; listed first in the grid alongside Firestore gallery items when present */
const GALLERY_SPOTLIGHT_ITEMS = [
  {
    id: 'spotlight-rwf-team',
    src: galleryRwfTeam,
    description: 'RWF volunteers in branded shirts — Supporting Communities, standing together',
  },
  {
    id: 'spotlight-mattresses',
    src: galleryMattressDonation,
    description: 'Bedding donation handover with staff, partners, and residents',
  },
  {
    id: 'spotlight-extra-01',
    src: galleryExtra01,
    description: 'Volunteers together under the foundation tent',
  },
  {
    id: 'spotlight-extra-02',
    src: galleryExtra02,
    description: 'Community listening session under the marquee',
  },
  {
    id: 'spotlight-extra-03',
    src: galleryExtra03,
    description: 'Leadership line-up with RWF banner at an outdoor event',
  },
  {
    id: 'spotlight-extra-04',
    src: galleryExtra04,
    description: 'Celebrating handmade blankets and peer support',
  },
  {
    id: 'spotlight-extra-05',
    src: galleryExtra05,
    description: 'Essentials handover with young women in care',
  },
  {
    id: 'spotlight-extra-06',
    src: galleryExtra06,
    description: 'Food, hygiene, and household supplies for vulnerable families',
  },
  {
    id: 'spotlight-extra-07',
    src: galleryExtra07,
    description: 'Foundation banner at a field presentation',
  },
  {
    id: 'spotlight-extra-08',
    src: galleryExtra08,
    description: 'Colourful handmade pouches from a skills support day',
  },
  {
    id: 'spotlight-extra-09',
    src: galleryExtra09,
    description: 'Word of encouragement beside the foundation display',
  },
  {
    id: 'spotlight-extra-10',
    src: galleryExtra10,
    description: 'Fresh produce and milk shared at an institutional outreach',
  },
  {
    id: 'spotlight-extra-11',
    src: galleryExtra11,
    description: 'Celebrating crochet and sewing work from mentorship workshops',
  },
  {
    id: 'spotlight-extra-12',
    src: galleryExtra12,
    description: 'Neighbours gathered for dialogue under the tent',
  },
  {
    id: 'spotlight-extra-13',
    src: galleryExtra13,
    description: 'RWF supporters and partners at a community tent gathering',
  },
  {
    id: 'spotlight-extra-14',
    src: galleryExtra14,
    description: 'Programme hosts welcoming guests in the round tent',
  },
  {
    id: 'spotlight-extra-15',
    src: galleryExtra15,
    description: 'Presenting community care programmes outdoors',
  },
  {
    id: 'spotlight-extra-16',
    src: galleryExtra16,
    description: 'Partners shaking hands after a foundation community event',
  },
];

const PRISON_KEYWORDS = /(prison|inmate|incarcerat|correctional|warden|custody)/i;
const SENSITIVE_KEYWORDS = /(elderly\s+care|essential\s+care|essentials?\s+.*care)/i;

function isAllowedGalleryItem(item) {
  const text = `${item?.description || ''} ${item?.title || ''}`.trim();
  return !PRISON_KEYWORDS.test(text) && !SENSITIVE_KEYWORDS.test(text);
}

function hashStringToIndex(value, modulo) {
  const str = String(value ?? '');
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return modulo > 0 ? hash % modulo : 0;
}

const FALLBACK_PLACEHOLDER =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#e2e8f0"/>
          <stop offset="1" stop-color="#f8fafc"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)"/>
      <rect x="70" y="70" width="1060" height="760" rx="48" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
      <path d="M170 690l220-250 210 190 180-210 250 270" fill="none" stroke="#94a3b8" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="380" cy="350" r="70" fill="#cbd5e1"/>
      <text x="600" y="520" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="46" text-anchor="middle" fill="#475569">
        Image unavailable
      </text>
      <text x="600" y="580" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="28" text-anchor="middle" fill="#64748b">
        Check the URL or upload a new photo.
      </text>
    </svg>`
  );

const fallbackImages = [
  {
    src: image1,
    description: 'Community outreach in Kitale',
  },
  {
    src: image2,
    description: 'Nutritional support for caregivers',
  },
  {
    src: image3,
    description: 'Mentorship sessions with returning citizens',
  },
  { src: image4, description: 'Community ministry in partnership with local leaders' },
  { src: image5, description: 'Youth leadership workshops' },
  { src: image6, description: 'Assistive device distribution' },
  { src: image7, description: 'Second chances and reintegration support' },
  { src: image8, description: 'Volunteer teams preparing care packages' },
  { src: image9, description: 'Community support distribution day' },
  { src: image10, description: 'Celebrating community milestones' },
];

const Gallery = ({ embedded = false }) => {
  const [lightbox, setLightbox] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, closeLightbox]);

  useEffect(() => {
    const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGalleryItems(docs);
        setLoading(false);
      },
      () => {
        setGalleryItems([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const itemsToShow = useMemo(() => {
    if (galleryItems.length > 0) {
      const normalized = galleryItems
        .map((item) => ({
          id: item.id,
          src: item.image || item.imageUrl || '',
          description: item.title || item.description || 'Impact moment',
        }))
        .filter((item) => Boolean(item.src && String(item.src).trim().length > 0));

      if (normalized.length > 0) {
        return [...GALLERY_SPOTLIGHT_ITEMS, ...normalized].filter(isAllowedGalleryItem);
      }
    }
    return [...GALLERY_SPOTLIGHT_ITEMS, ...fallbackImages].filter(isAllowedGalleryItem);
  }, [galleryItems]);

  const gridItems = useMemo(() => {
    if (!embedded) return itemsToShow;
    return itemsToShow.slice(0, 20);
  }, [embedded, itemsToShow]);

  const openLightbox = useCallback((image) => {
    const src = image && typeof image.src === 'string' ? image.src.trim() : '';
    if (!src) return;
    setLightbox({
      src,
      description: typeof image.description === 'string' ? image.description : 'Gallery image',
    });
  }, []);

  return (
    <div
      className={
        embedded
          ? 'py-10 px-2 text-white sm:px-4'
          : 'py-12 px-4 text-white sm:px-6'
      }
    >
      <div className={`mx-auto flex w-full max-w-6xl flex-col ${embedded ? 'gap-8' : 'gap-10'}`}>
        <header className="space-y-3 text-center">
          {embedded ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Impact gallery
              </span>
              <h2 className="text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl">
                Stories of hope in motion
              </h2>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
                Moments from our programmes, volunteers, and partners—tap a photo to enlarge.
              </p>
              <div className="flex justify-center pt-1">
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  View full gallery
                </Link>
              </div>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Impact gallery
              </span>
              <h1 className="text-3xl font-semibold sm:text-4xl">Stories of hope in motion</h1>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
                Moments captured from our programmes, volunteers, and community partners. Every image
                represents generosity transformed into action.
              </p>
            </>
          )}
        </header>

        {loading ? (
          <div
            className={
              embedded
                ? 'flex h-36 items-center justify-center rounded-3xl border border-dashed border-white/25 bg-white/5 text-sm font-semibold text-white/90'
                : 'flex h-40 items-center justify-center rounded-3xl border border-dashed border-emerald-200/40 bg-emerald-50 text-sm font-semibold text-emerald-700'
            }
          >
            Loading gallery…
          </div>
        ) : (
          <div
            className={
              embedded
                ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }
          >
            {gridItems.map((image) => (
              <button
                key={image.id || image.src}
                type="button"
                onClick={() => openLightbox(image)}
                className="group relative z-0 w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full">
                  <img
                    src={image.src}
                    alt={image.description}
                    onError={(event) => {
                      if (event.currentTarget.dataset.fallbackApplied) return;
                      event.currentTarget.dataset.fallbackApplied = '1';

                      const seed = image.id || image.description || image.src;
                      const localFallback =
                        LOCAL_GALLERY_IMAGES[
                          hashStringToIndex(seed, LOCAL_GALLERY_IMAGES.length)
                        ];
                      event.currentTarget.src = localFallback || FALLBACK_PLACEHOLDER;
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-3 pt-10 text-left">
                  <p className="text-sm font-semibold text-white">{image.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[1300] flex cursor-default items-center justify-center bg-slate-950/85 p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged gallery photo"
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-3 top-3 z-[1310] flex h-11 min-h-[44px] min-w-[44px] w-11 items-center justify-center rounded-full border border-white/35 bg-slate-900/80 text-2xl font-light leading-none text-white shadow-lg backdrop-blur transition hover:bg-slate-800 sm:right-5 sm:top-5"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
            >
              ×
            </button>
            <div
              className="pointer-events-auto flex max-h-[88vh] max-w-[min(100vw-2rem,72rem)] items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.description}
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied) return;
                  event.currentTarget.dataset.fallbackApplied = '1';
                  event.currentTarget.src = image1 || FALLBACK_PLACEHOLDER;
                }}
                className="max-h-[85vh] max-w-full object-contain shadow-2xl"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Gallery;
