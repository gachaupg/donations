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

const fallbackImages = [
  { src: image1, description: 'Community outreach in Kitale' },
  { src: image2, description: 'Nutritional support for caregivers' },
  { src: image3, description: 'Mentorship sessions with returning citizens' },
  { src: image4, description: 'Prison ministry in partnership with wardens' },
  { src: image5, description: 'Youth leadership workshops' },
  { src: image6, description: 'Assistive device distribution' },
  { src: image7, description: 'Teen mums receiving mentorship' },
  { src: image8, description: 'Family support visits' },
  { src: image9, description: 'Volunteer teams preparing care packages' },
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
      return galleryItems.map((item) => ({
        id: item.id,
        src: item.image || item.imageUrl || '',
        description: item.title || 'Impact moment',
      }));
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
    <div className="bg-white py-12 px-4 text-slate-900 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Impact gallery
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Stories of hope in motion</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Moments captured from our programmes, volunteers, and community partners. Every image
            represents generosity transformed into action.
          </p>
        </header>

        {loading ? (
          <div className="flex h-40 items-center justify-center rounded-3xl border border-dashed border-emerald-200/40 bg-emerald-50 text-sm font-semibold text-emerald-700">
            Loading gallery…
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {itemsToShow.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openLightbox(image.src)}
              className="group relative flex h-64 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={image.src}
                alt={image.description}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-4 pt-12 text-left">
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
            className="max-h-[85vh] w-full max-w-4xl rounded-3xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
