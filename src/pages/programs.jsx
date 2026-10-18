import React, { useCallback, useMemo, useState } from 'react';
import { data as programSeedData } from '../utils/data';
import { FiHeart, FiUsers, FiShield, FiSun, FiActivity } from 'react-icons/fi';
import image2 from '../assets/image_2.jpeg';
import image5 from '../assets/image_5.jpeg';
import image6 from '../assets/image_6.jpeg';
import image8 from '../assets/image_8.jpeg';
import image10 from '../assets/image_10.jpeg';
import elderlyCareImage from '../assets/elderly-care.png';
import teenMumsImage from '../assets/teen-mums.png';
import childrenIncarceratedParentImage from '../assets/children-incarcerated-parent.png';
import incarceratedRebuildingImage from '../assets/incarcerated-rebuilding-new.png';
import recoveringAddictsImage from '../assets/recovering-addicts-new.png';
import disabilityProgrammeImage from '../assets/disability-programme.png';

/** These titles always use the bundled local image, even if Firestore still has an old URL */
const PROGRAM_LOCAL_IMAGE_OVERRIDES_REMOTE = new Set([
  'elderly care',
  'teen moms mentorships',
  'children living with their incarcerated parent in prison',
  'incarcerated individuals rebuilding their lives',
  'recovering addicts',
  'people living with disabilities',
]);

const localProgramImagesByTitle = {
  'children living with their incarcerated parent in prison': childrenIncarceratedParentImage,
  'incarcerated individuals rebuilding their lives': incarceratedRebuildingImage,
  'teen moms mentorships': teenMumsImage,
  'elderly care': elderlyCareImage,
  'people living with disabilities': disabilityProgrammeImage,
  'recovering addicts': recoveringAddictsImage,
};

const LOCAL_IMAGE_ROTATION = [image5, image10, image6, image2, image8];

function pickLocalProgramImage(title, index) {
  const normalized = (title || '').toLowerCase().trim();
  if (localProgramImagesByTitle[normalized]) return localProgramImagesByTitle[normalized];

  // Keyword-based match to handle variations like "Prison Outreach" / "Teen Moms" etc.
  if (/(prison|reintegration|returning|incarcerat|parent in prison|leaving with)/.test(normalized)) return image5;
  if (/(teen|mum|mother|girls)/.test(normalized)) return teenMumsImage;
  if (/(elder|caregiver|senior)/.test(normalized)) return elderlyCareImage;
  if (/(disabil|pwd|assistive)/.test(normalized)) return disabilityProgrammeImage;
  if (/(recover|addiction|sobriety|rehab)/.test(normalized)) return recoveringAddictsImage;

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
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpanded = useCallback((key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const programList = programSeedData;

  const programKeys = useMemo(
    () =>
      programList.map((program, index) => ({
        key: program.id || `${program.title}-${index}`,
      })),
    [programList]
  );

  return (
    <div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
      <header className="space-y-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
          Foundation programmes
        </span>
        <h2 className="text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl">Our Programs</h2>
      </header>

        {programList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-emerald-200/40 bg-emerald-50 py-14 text-center">
            <p className="text-base font-semibold text-emerald-800">No programs available yet.</p>
            <p className="max-w-md text-sm text-emerald-600/80">
              Add programmes in the admin dashboard to showcase them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programList.map((program, index) => {
              const key = programKeys[index]?.key ?? `${program.title}-${index}`;
              const normalizedTitle = (program.title || '').toLowerCase().trim();
              const localFallback = pickLocalProgramImage(program.title, index);
              const programImage = PROGRAM_LOCAL_IMAGE_OVERRIDES_REMOTE.has(normalizedTitle)
                ? localFallback
                : localFallback;
              const Icon = pickProgramIcon(program.title);
              const isExpanded = expanded.has(key);
              const description = typeof program.description === 'string' ? program.description.trim() : '';
              const shouldShowToggle = description.length > 90;
              return (
                <article
                  key={key}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-emerald-950/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/20"
                >
                  <div className="relative h-44 w-full overflow-hidden sm:h-40">
                    {programImage ? (
                      <img
                        src={programImage}
                        alt=""
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
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-sm">
                            <Icon className="text-2xl" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                            Programme
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                        <Icon className="text-sm" aria-hidden="true" />
                      </span>
                      <h3 className="rwf-gold-text text-base font-semibold leading-snug sm:text-[1.05rem]">{program.title}</h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed text-slate-600"
                      style={
                        isExpanded
                          ? undefined
                          : {
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 3,
                              overflow: 'hidden',
                            }
                      }
                    >
                      {description}
                    </p>
                    {shouldShowToggle && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(key)}
                        aria-expanded={isExpanded}
                        className="mt-auto inline-flex w-fit items-center gap-1 pt-1 text-xs font-semibold text-emerald-700 transition hover:text-emerald-900"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                        <span aria-hidden="true" className={`transition ${isExpanded ? 'rotate-180' : ''}`}>
                          ↓
                        </span>
                      </button>
                    )}
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
