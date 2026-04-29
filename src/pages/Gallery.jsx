import React, { useEffect, useMemo, useState } from 'react';
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

const LOCAL_GALLERY_IMAGES = [
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
  { src: image4, description: 'Prison ministry in partnership with wardens' },
  { src: image5, description: 'Youth leadership workshops' },
  { src: image6, description: 'Assistive device distribution' },
  { src: image7, description: 'Second chances and reintegration support' },
  { src: image8, description: 'Volunteer teams preparing care packages' },
  { src: image9, description: 'Community support distribution day' },
  { src: image10, description: 'Celebrating community milestones' },
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        description: item.title || 'Impact moment',
        }))
        .filter((item) => Boolean(item.src && String(item.src).trim().length > 0));

      if (normalized.length > 0) return normalized;
    }
    return fallbackImages;
  }, [galleryItems]);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="py-12 px-4 text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Impact gallery
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Stories of hope in motion</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
            Moments captured from our programmes, volunteers, and community partners. Every image
            represents generosity transformed into action.
          </p>
        </header>

        {loading ? (
          <div className="flex h-40 items-center justify-center rounded-3xl border border-dashed border-emerald-200/40 bg-emerald-50 text-sm font-semibold text-emerald-700">
            Loading gallery…
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {itemsToShow.map((image) => (
              <button
                key={image.id || image.src}
                type="button"
                onClick={() => openLightbox(image.src)}
                className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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

      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
          role="button"
          tabIndex={0}
          onClick={closeLightbox}
          onKeyDown={(event) => event.key === 'Escape' && closeLightbox()}
        >
          <img
            src={currentImage}
            alt="Impact highlight"
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied) return;
              event.currentTarget.dataset.fallbackApplied = '1';
              event.currentTarget.src = image1 || FALLBACK_PLACEHOLDER;
            }}
            className="max-h-[85vh] w-full max-w-4xl rounded-3xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
