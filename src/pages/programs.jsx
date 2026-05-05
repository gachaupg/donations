import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { data as programSeedData } from '../utils/data';
import { upsertProgramSeeds, dedupeProgramsByTitle } from '../utils/programSeeding';
import { FiHeart, FiUsers, FiShield, FiSun, FiActivity } from 'react-icons/fi';
import image2 from '../assets/image_2.jpeg';
import image5 from '../assets/image_5.jpeg';
import image6 from '../assets/image_6.jpeg';
import image8 from '../assets/image_8.jpeg';
import image10 from '../assets/image_10.jpeg';
import elderlyCareImage from '../assets/elderly-care.png';
import teenMumsImage from '../assets/teen-mums.png';
import widowersImage from '../assets/widowers.png';
import childrenIncarceratedParentImage from '../assets/children-incarcerated-parent.png';
import childrenGrowingInPrisonImage from '../assets/children-growing-in-prison.png';

/** These titles always use the bundled local image, even if Firestore still has an old URL */
const PROGRAM_LOCAL_IMAGE_OVERRIDES_REMOTE = new Set([
  'elderly care',
  'support for teen mums',
  'widowers',
  'children leaving with an incarcerated parent in prison',
  'children growing in prison',
  'recovery support',
]);

const localProgramImagesByTitle = {
  'prison ministry': image5,
  'children leaving with an incarcerated parent in prison': childrenIncarceratedParentImage,
  'children growing in prison': childrenGrowingInPrisonImage,
  'support for teen mums': teenMumsImage,
  'elderly care': elderlyCareImage,
  widowers: widowersImage,
  'persons with disabilities': image8,
  'recovery support': image6,
};

const LOCAL_IMAGE_ROTATION = [image5, image10, image6, image2, image8];

function pickLocalProgramImage(title, index) {
  const normalized = (title || '').toLowerCase().trim();
  if (localProgramImagesByTitle[normalized]) return localProgramImagesByTitle[normalized];

  // Keyword-based match to handle variations like "Prison Outreach" / "Teen Moms" etc.
  if (/(growing in prison|babies in prison|infants in custody)/.test(normalized)) return childrenGrowingInPrisonImage;
  if (/(prison|reintegration|returning|incarcerat|parent in prison|leaving with)/.test(normalized)) return image5;
  if (/(teen|mum|mother|girls)/.test(normalized)) return teenMumsImage;
  if (/(elder|caregiver|senior)/.test(normalized)) return elderlyCareImage;
  if (/(widow|widower)/.test(normalized)) return widowersImage;
  if (/(disabil|pwd|assistive)/.test(normalized)) return image8;
  if (/(recover|addiction|sobriety|rehab)/.test(normalized)) return image6;

  // Last resort: rotate through local images so the grid never looks empty.
  return LOCAL_IMAGE_ROTATION[index % LOCAL_IMAGE_ROTATION.length];
}

function pickProgramIcon(title) {
  const normalized = (title || '').toLowerCase();
  if (/(growing in prison|babies in prison|infants in custody)/.test(normalized)) return FiHeart;
  if (/(prison|reintegration|returning|incarcerat|parent in prison|leaving with)/.test(normalized)) return FiShield;
  if (/(teen|mum|mother|girls)/.test(normalized)) return FiHeart;
  if (/(elder|caregiver|senior)/.test(normalized)) return FiActivity;
  if (/(widow|widower)/.test(normalized)) return FiUsers;
  if (/(disabil|pwd|assistive)/.test(normalized)) return FiSun;
  if (/(recover|addiction|sobriety|rehab)/.test(normalized)) return FiActivity;
  return FiHeart;
}

function isHttpUrl(value) {
  const str = typeof value === 'string' ? value.trim() : '';
  return /^https?:\/\//i.test(str);
}

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await upsertProgramSeeds(db, programSeedData);
      } catch (error) {
        console.error('Failed to seed programs collection', error);
      }
    })();
  }, []);

  useEffect(() => {
    const programsQuery = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      programsQuery,
      (snapshot) => {
        const docs = dedupeProgramsByTitle(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setPrograms(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Failed to load programs', error);
        setPrograms(
          dedupeProgramsByTitle(
            programSeedData.map((item, index) => ({
              id: `fallback-${index}`,
              ...item,
            }))
          )
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const programList = programs.length > 0 ? programs : programSeedData;

  return (
    <div>
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="space-y-3 text-center mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Foundation programmes
        </span>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl drop-shadow-lg">Our Programs</h2>
      </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 w-full">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200/30 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-emerald-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <p className="text-emerald-100 text-base font-medium mt-4">Loading programs...</p>
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
              const normalizedTitle = (program.title || '').toLowerCase().trim();
              const localFallback = pickLocalProgramImage(program.title, index);
              const remoteCandidate = program.image || program.imageUrl || '';
              const programImage = PROGRAM_LOCAL_IMAGE_OVERRIDES_REMOTE.has(normalizedTitle)
                ? localFallback
                : isHttpUrl(remoteCandidate)
                  ? remoteCandidate.trim()
                  : localFallback;
              const Icon = pickProgramIcon(program.title);
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
                        onError={(event) => {
                          if (event.currentTarget.dataset.fallbackApplied) return;
                          event.currentTarget.dataset.fallbackApplied = '1';
                          event.currentTarget.src = localFallback;
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700">
                        <div className="flex flex-col items-center gap-2">
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                            <Icon className="text-2xl" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                            Programme
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-semibold text-emerald-700">{program.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {program.description}
                    </p>
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
