import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

/** Superseded stable ids from earlier seed titles—removed so the list does not show two similar programmes. */
const DEPRECATED_PROGRAM_DOC_IDS = [
  'children-with-an-incarcerated-parent',
  'children-growing-in-prison',
];

/**
 * When seed titles change, the slug id changes too. Migrate old ids to new ids so we don't
 * show duplicates in Firestore-backed lists.
 */
const PROGRAM_DOC_ID_MIGRATIONS = [
  {
    from: 'children-leaving-with-an-incarcerated-parent-in-prison',
    to: 'children-living-with-their-incarcerated-parent-in-prison',
  },
  { from: 'support-for-teen-mums', to: 'teen-moms-mentorships' },
  { from: 'recovery-support', to: 'recovering-addicts' },
  { from: 'persons-with-disabilities', to: 'people-living-with-disabilities' },
];

/** Stable Firestore document id for catalogue programmes (avoids duplicate addDoc races). */
export function slugifyProgramId(title) {
  const raw = (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return raw || 'program';
}

export function programCreatedMs(p) {
  const c = p?.createdAt;
  if (c && typeof c.toMillis === 'function') return c.toMillis();
  if (c && typeof c.seconds === 'number') return c.seconds * 1000;
  return 0;
}

/**
 * One row per title. Prefer the doc whose id matches {@link slugifyProgramId} (seed upserts),
 * otherwise keep the newest by createdAt.
 */
export function dedupeProgramsByTitle(programs) {
  if (!Array.isArray(programs) || programs.length === 0) return programs;
  const groups = new Map();
  for (const p of programs) {
    const key = (p.title || '').toLowerCase().trim();
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  const out = [];
  for (const [, list] of groups) {
    if (list.length === 1) {
      out.push(list[0]);
      continue;
    }
    const slug = slugifyProgramId(list[0].title);
    const stable = list.find((x) => x.id === slug);
    if (stable) {
      out.push(stable);
      continue;
    }
    const sorted = list.slice().sort((a, b) => programCreatedMs(b) - programCreatedMs(a));
    out.push(sorted[0]);
  }
  out.sort((a, b) => programCreatedMs(b) - programCreatedMs(a));
  return out;
}

/**
 * Idempotent seed: one document per seed title under programs/{slug}.
 * Safe if Programs page, About, Home, and Dashboard all call it at once.
 * Existing docs: only title/description are refreshed from seed (images/uploads stay as-is).
 */
export async function upsertProgramSeeds(db, programSeedData) {
  for (const item of programSeedData) {
    const id = slugifyProgramId(item.title);
    const ref = doc(db, 'programs', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        title: item.title,
        description: item.description,
        image: item.image || '',
        storagePath: '',
        createdAt: serverTimestamp(),
      });
    } else {
      const updates = {
        title: item.title,
        description: item.description,
      };
      if (
        id === 'elderly-care' ||
        id === 'teen-moms-mentorships' ||
        id === 'widowers' ||
        id === 'children-living-with-their-incarcerated-parent-in-prison' ||
        id === 'recovering-addicts'
      ) {
        updates.image = item.image || '';
      }
      await setDoc(ref, updates, { merge: true });
    }
  }

  // Migrate old ids created by earlier seed titles.
  for (const { from, to } of PROGRAM_DOC_ID_MIGRATIONS) {
    try {
      const fromRef = doc(db, 'programs', from);
      const toRef = doc(db, 'programs', to);
      const [fromSnap, toSnap] = await Promise.all([getDoc(fromRef), getDoc(toRef)]);
      if (!fromSnap.exists()) continue;

      if (!toSnap.exists()) {
        // Keep any uploaded image/storagePath from the old doc, but the seed loop above
        // will already have ensured the new doc title/description are current.
        const fromData = fromSnap.data() || {};
        const patch = {};
        if (typeof fromData.image === 'string' && fromData.image.trim()) patch.image = fromData.image;
        if (typeof fromData.storagePath === 'string' && fromData.storagePath.trim()) patch.storagePath = fromData.storagePath;
        if (fromData.createdAt) patch.createdAt = fromData.createdAt;
        if (Object.keys(patch).length > 0) {
          await setDoc(toRef, patch, { merge: true });
        }
      }

      await deleteDoc(fromRef);
    } catch (e) {
      console.warn('Program seed: could not migrate doc id', from, '->', to, e);
    }
  }

  for (const oldId of DEPRECATED_PROGRAM_DOC_IDS) {
    try {
      const oldRef = doc(db, 'programs', oldId);
      const oldSnap = await getDoc(oldRef);
      if (oldSnap.exists()) await deleteDoc(oldRef);
    } catch (e) {
      console.warn('Program seed: could not remove deprecated doc', oldId, e);
    }
  }
}
