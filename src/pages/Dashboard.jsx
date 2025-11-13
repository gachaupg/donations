import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiImage,
  FiLayers,
  FiMessageSquare,
  FiCreditCard,
  FiLogOut,
  FiUsers,
  FiPlusCircle,
  FiSettings,
  FiArrowRightCircle,
  FiEdit,
  FiTrash2,
  FiX,
  FiType,
} from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { useAuth } from '../context/AuthContext.jsx';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { data as programSeedData } from '../utils/data.jsx';

const sidebarLinks = [
  { label: 'Overview', icon: FiHome, tab: 'overview' },
  { label: 'Programs', icon: FiLayers, tab: 'programs' },
  { label: 'Gallery', icon: FiImage, tab: 'gallery' },
  { label: 'Messages', icon: FiMessageSquare, tab: 'messages' },
  { label: 'Branding', icon: FiType, tab: 'branding' },
  { label: 'Transactions', icon: FiCreditCard, tab: 'transactions' },
  { label: 'Settings', icon: FiSettings, href: '/admin' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [programs, setPrograms] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [newProgram, setNewProgram] = useState({ title: '', description: '' });
  const [newProgramFile, setNewProgramFile] = useState(null);
  const [programFileKey, setProgramFileKey] = useState(0);
  const [savingProgram, setSavingProgram] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '' });
  const [newGalleryFile, setNewGalleryFile] = useState(null);
  const [galleryFileKey, setGalleryFileKey] = useState(0);
  const [savingGalleryItem, setSavingGalleryItem] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [deletingProgramId, setDeletingProgramId] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [deletingGalleryId, setDeletingGalleryId] = useState(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [brandingData, setBrandingData] = useState(null);
  const [brandingLoading, setBrandingLoading] = useState(true);
  const [brandingFile, setBrandingFile] = useState(null);
  const [brandingFileKey, setBrandingFileKey] = useState(0);
  const [savingBranding, setSavingBranding] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut(auth);
      navigate('/login');
    } finally {
      setSigningOut(false);
    }
  };

  const resetGalleryForm = () => {
    setEditingGalleryId(null);
    setNewGalleryItem({ title: '' });
    setNewGalleryFile(null);
    setGalleryFileKey((prev) => prev + 1);
  };

  const openGalleryModalForCreate = () => {
    resetGalleryForm();
    setIsGalleryModalOpen(true);
  };

  const handleEditGalleryItem = (item) => {
    setEditingGalleryId(item.id);
    setNewGalleryItem({ title: item.title || '' });
    setNewGalleryFile(null);
    setGalleryFileKey((prev) => prev + 1);
    setIsGalleryModalOpen(true);
  };

  const handleCancelGalleryEdit = () => {
    setIsGalleryModalOpen(false);
    resetGalleryForm();
  };

  const handleDeleteGalleryItem = async (item) => {
    if (!item?.id) {
      return;
    }
    const shouldDelete = window.confirm(`Delete "${item.title || 'this gallery item'}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingGalleryId(item.id);
      await deleteDoc(doc(db, 'gallery', item.id));
      if (item.storagePath) {
        try {
          await deleteObject(ref(storage, item.storagePath));
        } catch (error) {
          console.error('Failed to delete gallery asset from storage', error);
        }
      }
      if (editingGalleryId === item.id) {
        handleCancelGalleryEdit();
      }
    } catch (error) {
      console.error('Failed to delete gallery item', error);
    } finally {
      setDeletingGalleryId(null);
    }
  };

  const handleEditProgram = (program) => {
    setEditingProgramId(program.id);
    setNewProgram({
      title: program.title || '',
      description: program.description || '',
    });
    setNewProgramFile(null);
    setProgramFileKey((prev) => prev + 1);
    setIsProgramModalOpen(true);
  };

  const handleCancelProgramEdit = () => {
    setIsProgramModalOpen(false);
    resetProgramForm();
  };

  const handleDeleteProgram = async (program) => {
    if (!program?.id) {
      return;
    }
    const shouldDelete = window.confirm(`Delete "${program.title || 'this program'}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingProgramId(program.id);
      await deleteDoc(doc(db, 'programs', program.id));
      if (program.storagePath) {
        try {
          await deleteObject(ref(storage, program.storagePath));
        } catch (error) {
          console.error('Failed to delete program asset from storage', error);
        }
      }
      if (editingProgramId === program.id) {
        handleCancelProgramEdit();
      }
    } catch (error) {
      console.error('Failed to delete program', error);
    } finally {
      setDeletingProgramId(null);
    }
  };

  useEffect(() => {
    const seedCollectionsIfNeeded = async () => {
      try {
        const programsCollection = collection(db, 'programs');
        const programsSnapshot = await getDocs(programsCollection);
        const existingProgramTitles = new Set(
          programsSnapshot.docs.map((doc) => (doc.data().title || '').toLowerCase())
        );
        const programSeedsToAdd = programSeedData.filter(
          (item) => !existingProgramTitles.has(item.title.toLowerCase())
        );

        if (programSeedsToAdd.length > 0) {
          await Promise.all(
            programSeedsToAdd.map((item) =>
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

        const galleryCollection = collection(db, 'gallery');
        const gallerySnapshot = await getDocs(galleryCollection);
        const existingGalleryTitles = new Set(
          gallerySnapshot.docs.map((doc) => (doc.data().title || '').toLowerCase())
        );
        const gallerySeedSource = programSeedData.slice(0, 6);
        const gallerySeedsToAdd = gallerySeedSource.filter(
          (item) => !existingGalleryTitles.has(item.title.toLowerCase())
        );

        if (gallerySeedsToAdd.length > 0) {
          await Promise.all(
            gallerySeedsToAdd.map((item) =>
              addDoc(galleryCollection, {
                title: item.title,
                image: item.image || '',
                storagePath: '',
                createdAt: serverTimestamp(),
              })
            )
          );
        }
      } catch (error) {
        console.error('Failed to seed initial dashboard content', error);
      }
    };

    seedCollectionsIfNeeded();
  }, []);

  useEffect(() => {
    const programsQuery = query(collection(db, 'programs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      programsQuery,
      (snapshot) => {
        setPrograms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setProgramsLoading(false);
      },
      () => {
        setPrograms([]);
        setProgramsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        setGalleryItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setGalleryLoading(false);
      },
      () => {
        setGalleryItems([]);
        setGalleryLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const brandingRef = doc(db, 'branding', 'global');
    const unsubscribe = onSnapshot(
      brandingRef,
      (snapshot) => {
        setBrandingData(snapshot.exists() ? snapshot.data() : null);
        setBrandingLoading(false);
      },
      () => {
        setBrandingData(null);
        setBrandingLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const resetProgramForm = () => {
    setNewProgram({ title: '', description: '' });
    setNewProgramFile(null);
    setProgramFileKey((prev) => prev + 1);
    setEditingProgramId(null);
  };

  const openProgramModalForCreate = () => {
    resetProgramForm();
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = async (event) => {
    event.preventDefault();
    if (!newProgram.title.trim() || !newProgram.description.trim()) {
      return;
    }

    try {
      setSavingProgram(true);
      const trimmedTitle = newProgram.title.trim();
      const trimmedDescription = newProgram.description.trim();
      const isEditing = Boolean(editingProgramId);
      let uploadedImageUrl = '';
      let uploadedStoragePath = '';
      let previousStoragePath = '';

      if (newProgramFile) {
        uploadedStoragePath = `programs/${Date.now()}-${newProgramFile.name.replace(/\s+/g, '-')}`;
        const fileRef = ref(storage, uploadedStoragePath);
        await uploadBytes(fileRef, newProgramFile);
        uploadedImageUrl = await getDownloadURL(fileRef);
      }

      if (isEditing && editingProgramId) {
        const programRef = doc(db, 'programs', editingProgramId);
        const existingProgram = programs.find((program) => program.id === editingProgramId);
        if (existingProgram?.storagePath) {
          previousStoragePath = existingProgram.storagePath;
        }

        const updates = {
          title: trimmedTitle,
          description: trimmedDescription,
        };

        if (newProgramFile) {
          updates.image = uploadedImageUrl;
          updates.storagePath = uploadedStoragePath;
        }

        await updateDoc(programRef, updates);

        if (newProgramFile && previousStoragePath) {
          try {
            await deleteObject(ref(storage, previousStoragePath));
          } catch (error) {
            console.error('Failed to delete previous program image', error);
          }
        }
      } else {
        await addDoc(collection(db, 'programs'), {
          title: trimmedTitle,
          description: trimmedDescription,
          image: uploadedImageUrl,
          storagePath: uploadedStoragePath,
          createdAt: serverTimestamp(),
        });
      }

      resetProgramForm();
      setIsProgramModalOpen(false);
    } catch (error) {
      console.error('Failed to save program', error);
    } finally {
      setSavingProgram(false);
    }
  };

  const handleSaveGalleryItem = async (event) => {
    event.preventDefault();
    if (!newGalleryItem.title.trim()) {
      return;
    }

    try {
      setSavingGalleryItem(true);
      const trimmedTitle = newGalleryItem.title.trim();
      const isEditing = Boolean(editingGalleryId);
      let uploadedImageUrl = '';
      let uploadedStoragePath = '';
      let previousStoragePath = '';

      if (!isEditing && !newGalleryFile) {
        return;
      }

      if (newGalleryFile) {
        uploadedStoragePath = `gallery/${Date.now()}-${newGalleryFile.name.replace(/\s+/g, '-')}`;
        const fileRef = ref(storage, uploadedStoragePath);
        await uploadBytes(fileRef, newGalleryFile);
        uploadedImageUrl = await getDownloadURL(fileRef);
      }

      if (isEditing && editingGalleryId) {
        const galleryRef = doc(db, 'gallery', editingGalleryId);
        const existingItem = galleryItems.find((item) => item.id === editingGalleryId);
        if (existingItem?.storagePath) {
          previousStoragePath = existingItem.storagePath;
        }

        const updates = {
          title: trimmedTitle,
        };

        if (newGalleryFile) {
          updates.image = uploadedImageUrl;
          updates.storagePath = uploadedStoragePath;
        }

        await updateDoc(galleryRef, updates);

        if (newGalleryFile && previousStoragePath) {
          try {
            await deleteObject(ref(storage, previousStoragePath));
          } catch (error) {
            console.error('Failed to delete previous gallery image', error);
          }
        }
      } else {
        await addDoc(collection(db, 'gallery'), {
          title: trimmedTitle,
          image: uploadedImageUrl,
          storagePath: uploadedStoragePath,
          createdAt: serverTimestamp(),
        });
      }

      resetGalleryForm();
      setIsGalleryModalOpen(false);
    } catch (error) {
      console.error('Failed to save gallery item', error);
    } finally {
      setSavingGalleryItem(false);
    }
  };

  const handleSaveBranding = async (event) => {
    event.preventDefault();
    if (!brandingFile && !(brandingData?.logoUrl || '')) {
      return;
    }

    try {
      setSavingBranding(true);
      const brandingRef = doc(db, 'branding', 'global');
      const previousStoragePath = brandingData?.logoStoragePath || '';
      let nextLogoUrl = brandingData?.logoUrl || '';
      let nextStoragePath = brandingData?.logoStoragePath || '';

      if (brandingFile) {
        nextStoragePath = `branding/logo-${Date.now()}-${brandingFile.name.replace(/\s+/g, '-')}`;
        const fileRef = ref(storage, nextStoragePath);
        await uploadBytes(fileRef, brandingFile);
        nextLogoUrl = await getDownloadURL(fileRef);
      }

      await setDoc(
        brandingRef,
        {
          logoUrl: nextLogoUrl,
          logoStoragePath: nextStoragePath,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      if (brandingFile && previousStoragePath && previousStoragePath !== nextStoragePath) {
        try {
          await deleteObject(ref(storage, previousStoragePath));
        } catch (error) {
          console.error('Failed to delete previous branding asset', error);
        }
      }

      setBrandingFile(null);
      setBrandingFileKey((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to update branding', error);
    } finally {
      setSavingBranding(false);
    }
  };

  const handleRemoveBrandingLogo = async () => {
    if (!brandingData?.logoUrl) {
      return;
    }

    try {
      setSavingBranding(true);
      const brandingRef = doc(db, 'branding', 'global');
      await setDoc(
        brandingRef,
        {
          logoUrl: '',
          logoStoragePath: '',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      if (brandingData.logoStoragePath) {
        try {
          await deleteObject(ref(storage, brandingData.logoStoragePath));
        } catch (error) {
          console.error('Failed to delete branding asset', error);
        }
      }
      setBrandingFile(null);
      setBrandingFileKey((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to clear branding', error);
    } finally {
      setSavingBranding(false);
    }
  };

  useEffect(() => {
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setMessagesLoading(false);
      },
      () => {
        setMessages([]);
        setMessagesLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const transactionsQuery = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setTransactionsLoading(false);
      },
      () => {
        setTransactions([]);
        setTransactionsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const programsCount = programs.length;
  const galleryCount = galleryItems.length;
  const messageCount = messages.length;
  const donationTotal = transactions.reduce((sum, txn) => {
    const value = typeof txn.amount === 'number' ? txn.amount : parseFloat(txn.amount);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-2xl">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Admin Dashboard</h1>
          <p className="text-slate-600 mb-8">
            Sign into the foundation admin account to monitor outreach, donations, and messages.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white/95 py-10 px-6 shadow-lg lg:flex">
        <div className="mb-10 space-y-2">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Admin
          </span>
          <h2 className="text-xl font-semibold text-slate-900 leading-tight">
            Reuben Wairicu Foundation
          </h2>
        </div>
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map(({ label, icon: Icon, tab, href }) =>
            tab ? (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                    activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon />
                </span>
                {label}
              </button>
            ) : (
              <Link
                key={label}
                to={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon />
                </span>
                {label}
              </Link>
            )
          )}
        </nav>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:pointer-events-none disabled:opacity-70"
        >
          <FiLogOut />
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
          {activeTab === 'overview' && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-500">Total Programs</h3>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <FiLayers />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{programsCount}</p>
                  <p className="mt-2 text-xs text-slate-500">Active initiatives across counties</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-500">Gallery Stories</h3>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <FiImage />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{galleryCount}</p>
                  <p className="mt-2 text-xs text-slate-500">Documented impact moments</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-500">Message Inbox</h3>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <FiMessageSquare />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{messageCount}</p>
                  <p className="mt-2 text-xs text-slate-500">Awaiting your response</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-500">Donations Recorded</h3>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <FiCreditCard />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {donationTotal.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Synced from PayPal sandbox donations
                  </p>
                </article>
              </section>

              <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Program Highlights</h2>
                      <p className="text-sm text-slate-500">
                        A snapshot of key outreach activities across the foundation.
                      </p>
                    </div>
                    <Link
                      to="/programs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      See all
                      <FiArrowRightCircle />
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {programs.slice(0, 2).map((program) => (
                      <div
                        key={program.id}
                        className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
                          Featured
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-emerald-900">{program.title}</h3>
                        <p className="mt-1 text-sm text-emerald-700 line-clamp-3">{program.description}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Volunteer Momentum</h2>
                      <p className="text-sm text-slate-500">
                        Track engagement with community partners and support teams.
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <FiUsers />
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-600">Active volunteers</p>
                      <p className="text-sm font-semibold text-slate-900">182</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-600">Pending applications</p>
                      <p className="text-sm font-semibold text-slate-900">12</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Response time
                      </p>
                      <div className="mt-2 flex h-10 items-center gap-2 rounded-full bg-emerald-50 px-3">
                        <span className="text-sm font-semibold text-emerald-700">2.6 hrs</span>
                        <span className="text-xs font-medium text-emerald-600">35 mins faster</span>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            </>
          )}

          {activeTab === 'programs' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Programs</h2>
                  <p className="text-sm text-slate-500">
                    Manage outreach initiatives. Use the modal form to add new entries or update existing ones.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openProgramModalForCreate}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
                >
                  <FiPlusCircle />
                  Add program
                </button>
              </header>
              {programsLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading programs…
                </div>
              ) : programs.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  No programs published yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Image</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {programs.map((program) => {
                        const programImage = program.image || program.imageUrl || '';
                        return (
                          <tr key={program.id}>
                            <td className="px-4 py-3 font-semibold text-slate-900">{program.title}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              <p className="line-clamp-3 max-w-xl">{program.description}</p>
                            </td>
                            <td className="px-4 py-3">
                              {programImage ? (
                                <img
                                  src={programImage}
                                  alt={program.title}
                                  className="h-12 w-12 rounded-xl object-cover"
                                />
                              ) : (
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                  None
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditProgram(program)}
                                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                >
                                  <FiEdit />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProgram(program)}
                                  disabled={deletingProgramId === program.id}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  <FiTrash2 />
                                  {deletingProgramId === program.id ? 'Deleting…' : 'Delete'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'gallery' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Gallery</h2>
                  <p className="text-sm text-slate-500">
                    Upload media moments. Use the modal form to spotlight images and captions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openGalleryModalForCreate}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
                >
                  <FiPlusCircle />
                  Upload image
                </button>
              </header>
              {galleryLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading gallery…
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  No gallery items uploaded yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Preview</th>
                        <th className="px-4 py-3 font-semibold">Caption</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {galleryItems.map((item) => {
                        const imageSrc = item.image || item.imageUrl || '';
                        return (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              {imageSrc ? (
                                <img src={imageSrc} alt={item.title} className="h-14 w-14 rounded-xl object-cover" />
                              ) : (
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                  None
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">{item.title}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditGalleryItem(item)}
                                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                >
                                  <FiEdit />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteGalleryItem(item)}
                                  disabled={deletingGalleryId === item.id}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  <FiTrash2 />
                                  {deletingGalleryId === item.id ? 'Deleting…' : 'Delete'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'branding' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Branding</h2>
                  <p className="text-sm text-slate-500">
                    Update the logo displayed in the public navigation bar and footer.
                  </p>
                </div>
              </header>
              {brandingLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading branding…
                </div>
              ) : (
                <form className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]" onSubmit={handleSaveBranding}>
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Current logo
                      </p>
                      <div className="mt-4 flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-4">
                        {brandingData?.logoUrl ? (
                          <img
                            src={brandingData.logoUrl}
                            alt="Brand logo preview"
                            className="max-h-32 w-auto object-contain"
                          />
                        ) : (
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            No logo uploaded
                          </span>
                        )}
                      </div>
                    </div>
                    {brandingData?.updatedAt?.toDate && (
                      <p className="text-xs text-slate-500">
                        Last updated:{' '}
                        <span className="font-semibold text-slate-600">
                          {brandingData.updatedAt.toDate().toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-600">Upload new logo</label>
                      <input
                        key={brandingFileKey}
                        type="file"
                        accept="image/*"
                        onChange={(event) => setBrandingFile(event.target.files?.[0] || null)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                      <p className="text-xs text-slate-500">
                        Recommended: transparent PNG or SVG, at least 320px wide for optimal clarity.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={savingBranding || (!brandingFile && !brandingData?.logoUrl)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
                      >
                        {savingBranding ? 'Saving…' : 'Save branding'}
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveBrandingLogo}
                        disabled={savingBranding || !brandingData?.logoUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Remove logo
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </section>
          )}

          {activeTab === 'messages' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Messages</h2>
                  <p className="text-sm text-slate-500">
                    Messages submitted through the contact page appear here in real time.
                  </p>
                </div>
                <Link to="/contact" className="text-sm font-semibold text-emerald-600">
                  Open contact page
                </Link>
              </header>
              {messagesLoading ? (
                <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
                  <FiMessageSquare className="text-3xl text-slate-400 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-600">Loading messages…</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
                  <FiMessageSquare className="text-3xl text-slate-400" />
                  <p className="text-sm font-semibold text-slate-600">No messages yet.</p>
                  <p className="text-xs text-slate-500">
                    Encourage supporters to reach out via the contact page to see updates here.
                  </p>
                </div>
              ) : (
                <ul className="mt-6 space-y-4">
                  {messages.map((message) => (
                    <li
                      key={message.id}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{message.name}</p>
                          <p className="text-xs text-slate-500">{message.email}</p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600">
                          {message.createdAt?.toDate
                            ? message.createdAt.toDate().toLocaleString()
                            : 'Pending'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {message.subject}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{message.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {activeTab === 'transactions' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Transactions</h2>
                  <p className="text-sm text-slate-500">
                    Donations captured via PayPal sandbox are synced here for quick reconciliation.
                  </p>
                </div>
                <Link to="/donate" className="text-sm font-semibold text-emerald-600">
                  Test a donation
                </Link>
              </header>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Donor</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsLoading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-12 text-center text-sm font-semibold text-slate-500"
                        >
                          Loading transactions…
                        </td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-12 text-center text-sm font-semibold text-slate-500"
                        >
                          No transactions recorded yet. Process a sandbox donation to populate this table.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((txn) => (
                        <tr key={txn.id} className="divide-x divide-slate-200">
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {txn.createdAt?.toDate
                              ? txn.createdAt.toDate().toLocaleString()
                              : 'Pending'}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {txn.payerName || 'Anonymous'}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {txn.payerEmail || '—'}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-800">
                            {txn.currency || 'USD'}{' '}
                            {(typeof txn.amount === 'number'
                              ? txn.amount
                              : parseFloat(txn.amount || 0)
                            ).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                (txn.status || '').toUpperCase() === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {txn.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
      {isProgramModalOpen && (
        <DashboardModal
          title={editingProgramId ? 'Edit program' : 'Add program'}
          description="Manage outreach initiatives. Use the form below to add new entries."
          onClose={handleCancelProgramEdit}
        >
          <form className="grid gap-4" onSubmit={handleSaveProgram}>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Program title</label>
              <input
                value={newProgram.title}
                onChange={(event) => setNewProgram((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Enter program name"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Description</label>
              <textarea
                value={newProgram.description}
                onChange={(event) =>
                  setNewProgram((prev) => ({ ...prev, description: event.target.value }))
                }
                rows={4}
                placeholder="Describe the impact of this initiative"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">
                {editingProgramId ? 'Replace cover image (optional)' : 'Cover image (optional)'}
              </label>
              <input
                key={programFileKey}
                type="file"
                accept="image/*"
                onChange={(event) => setNewProgramFile(event.target.files?.[0] || null)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              <p className="text-xs text-slate-500">
                Supported formats: JPG, PNG, WebP. Max size depends on your Firebase Storage rules.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={savingProgram}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                <FiPlusCircle />
                {savingProgram
                  ? editingProgramId
                    ? 'Saving changes…'
                    : 'Saving…'
                  : editingProgramId
                    ? 'Save changes'
                    : 'Add program'}
              </button>
              <button
                type="button"
                onClick={handleCancelProgramEdit}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </DashboardModal>
      )}
      {isGalleryModalOpen && (
        <DashboardModal
          title={editingGalleryId ? 'Edit gallery item' : 'Upload gallery image'}
          description="Upload media moments. Images are stored in Firebase Storage and metadata in Firestore."
          onClose={handleCancelGalleryEdit}
        >
          <form className="grid gap-4" onSubmit={handleSaveGalleryItem}>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Caption</label>
              <input
                value={newGalleryItem.title}
                onChange={(event) =>
                  setNewGalleryItem((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Image caption"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">
                {editingGalleryId ? 'Replace image (optional)' : 'Upload image'}
              </label>
              <input
                key={galleryFileKey}
                type="file"
                accept="image/*"
                onChange={(event) => setNewGalleryFile(event.target.files?.[0] || null)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              <p className="text-xs text-slate-500">
                Choose a high-resolution image to spotlight in the dashboard gallery.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={savingGalleryItem || (!editingGalleryId && !newGalleryFile)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                <FiPlusCircle />
                {savingGalleryItem
                  ? editingGalleryId
                    ? 'Saving changes…'
                    : 'Saving…'
                  : editingGalleryId
                    ? 'Save changes'
                    : 'Upload image'}
              </button>
              <button
                type="button"
                onClick={handleCancelGalleryEdit}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </DashboardModal>
      )}
    </div>
  );
};

export default Dashboard;

const DashboardModal = ({ title, description, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX />
          </button>
        </header>
        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

