import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { data as programSeedData } from '../utils/data';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seedMissingPrograms = async () => {
      try {
        const programsCollection = collection(db, 'programs');
        const snapshot = await getDocs(programsCollection);
        const existingTitles = new Set(
          snapshot.docs.map((doc) => (doc.data().title || '').toLowerCase())
        );
        const seedsToAdd = programSeedData.filter(
          (item) => !existingTitles.has(item.title.toLowerCase())
        );

        if (seedsToAdd.length > 0) {
          await Promise.all(
            seedsToAdd.map((item) =>
              addDoc(programsCollection, {
                title: item.title,
                description: item.description,
                image: item.image || '',
                storagePath: '',
                createdAt: serverTimestamp(),
              })
            )
          );
        }
      } catch (error) {
        console.error('Failed to seed programs collection', error);
      }
    };

    seedMissingPrograms();
  }, []);

  useEffect(() => {
    const programsQuery = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      programsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrograms(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Failed to load programs', error);
        setPrograms(
          programSeedData.map((item, index) => ({
            id: `fallback-${index}`,
            ...item,
          }))
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const programList = programs.length > 0 ? programs : programSeedData;

  return (
    <div className="bg-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col gap-6 px-4 py-8 text-slate-900 sm:px-6">
      <header className="space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Foundation programmes
        </span>
        <h2 className="text-3xl font-semibold text-emerald-700 sm:text-4xl">Our Programs</h2>
      </header>

        {loading ? (
          <div className="flex h-48 w-full items-center justify-center rounded-[26px] border border-dashed border-emerald-200/40 bg-emerald-50 text-sm font-semibold text-emerald-600/70">
            Loading programs…
          </div>
        ) : programList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[26px] border border-dashed border-emerald-200/40 bg-emerald-50 py-14 text-center">
            <p className="text-base font-semibold text-emerald-800">No programs available yet.</p>
            <p className="max-w-md text-sm text-emerald-600/80">
              Add programmes in the admin dashboard to showcase them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programList.map((program, index) => {
              const programImage = program.image || program.imageUrl || '';
              return (
                <article
                  key={program.id || `${program.title}-${index}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-emerald-200/60 bg-white transition duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {programImage ? (
                      <img
                        src={programImage}
                        alt={program.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-sm font-semibold text-emerald-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-semibold text-emerald-700">{program.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{program.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
