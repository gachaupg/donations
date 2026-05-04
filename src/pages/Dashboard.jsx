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
  FiInfo,
  FiStar,
  FiAward,
  FiCheck,
  FiXCircle,
  FiRefreshCw,
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
import { upsertProgramSeeds, dedupeProgramsByTitle } from '../utils/programSeeding';

const sidebarLinks = [
  { label: 'Overview', icon: FiHome, tab: 'overview' },
  { label: 'Programs', icon: FiLayers, tab: 'programs' },
  { label: 'Gallery', icon: FiImage, tab: 'gallery' },
  { label: 'About', icon: FiInfo, tab: 'about' },
  { label: 'Testimonials', icon: FiStar, tab: 'testimonials' },
  { label: 'Sponsorships', icon: FiAward, tab: 'sponsorships' },
  { label: 'Return & Reintegration', icon: FiRefreshCw, tab: 'reintegration' },
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
  const [aboutData, setAboutData] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '', image: '' });
  const [newTestimonialFile, setNewTestimonialFile] = useState(null);
  const [testimonialFileKey, setTestimonialFileKey] = useState(0);
  const [savingTestimonial, setSavingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [sponsorships, setSponsorships] = useState([]);
  const [sponsorshipsLoading, setSponsorshipsLoading] = useState(true);
  const [updatingSponsorshipId, setUpdatingSponsorshipId] = useState(null);

  const [returningWorkers, setReturningWorkers] = useState([]);
  const [returningWorkersLoading, setReturningWorkersLoading] = useState(true);
  const [newReturningWorker, setNewReturningWorker] = useState({
    fullName: '',
    phone: '',
    notes: '',
  });
  const [savingReturningWorker, setSavingReturningWorker] = useState(false);
  const [updatingReturningWorkerId, setUpdatingReturningWorkerId] = useState(null);

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
        await upsertProgramSeeds(db, programSeedData);

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

        // Seed About content if it doesn't exist
        const aboutRef = doc(db, 'about', 'content');
        const aboutSnapshot = await getDocs(collection(db, 'about'));
        if (aboutSnapshot.empty) {
          await setDoc(aboutRef, {
            title: 'Reuben Wairicu Foundation',
            description: 'We uplift vulnerable families across Kenya with food security, health outreach, and restorative programs. Together, we honour the legacy of Reuben Wairicu by building a future where dignity is a human right, not a privilege.',
            mission: 'To provide holistic support to elders, caregivers, inmates, and persons with disabilities. We combine practical aid with mentorship to spark lasting change.',
            vision: 'A future where every person has access to dignity, opportunity, and community support regardless of their circumstances.',
            updatedAt: serverTimestamp(),
          }, { merge: true });
        }

        // Seed Testimonials if none exist
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        if (testimonialsSnapshot.empty) {
          const testimonialSeeds = [
            {
              name: 'Jane Wairicu',
              role: 'Foundation Director',
              content: 'The foundation has transformed countless lives in our community. Every donation makes a real difference.',
              image: '',
              storagePath: '',
            },
            {
              name: 'John Mwangi',
              role: 'Volunteer',
              content: 'Volunteering with the foundation has been one of the most rewarding experiences of my life.',
              image: '',
              storagePath: '',
            },
            {
              name: 'Mary Ochieng',
              role: 'Beneficiary',
              content: 'The support I received helped me rebuild my life. I am forever grateful to the foundation.',
              image: '',
              storagePath: '',
            },
          ];
          await Promise.all(
            testimonialSeeds.map((item) =>
              addDoc(testimonialsCollection, {
                ...item,
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
          dedupeProgramsByTitle(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
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

  useEffect(() => {
    const aboutRef = doc(db, 'about', 'content');
    const unsubscribe = onSnapshot(
      aboutRef,
      (snapshot) => {
        setAboutData(snapshot.exists() ? snapshot.data() : null);
        setAboutLoading(false);
      },
      () => {
        setAboutData(null);
        setAboutLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const testimonialsQuery = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      testimonialsQuery,
      (snapshot) => {
        setTestimonials(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setTestimonialsLoading(false);
      },
      () => {
        setTestimonials([]);
        setTestimonialsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const sponsorshipsQuery = query(collection(db, 'sponsors'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      sponsorshipsQuery,
      (snapshot) => {
        setSponsorships(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setSponsorshipsLoading(false);
      },
      () => {
        setSponsorships([]);
        setSponsorshipsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const workersQuery = query(collection(db, 'returningWorkers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      workersQuery,
      (snapshot) => {
        setReturningWorkers(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
        );
        setReturningWorkersLoading(false);
      },
      () => {
        setReturningWorkers([]);
        setReturningWorkersLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddReturningWorker = async (event) => {
    event.preventDefault();
    const fullName = newReturningWorker.fullName.trim();
    const phone = newReturningWorker.phone.trim();
    const notes = newReturningWorker.notes.trim();

    if (!fullName) return;

    try {
      setSavingReturningWorker(true);
      await addDoc(collection(db, 'returningWorkers'), {
        fullName,
        phone,
        notes,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      setNewReturningWorker({ fullName: '', phone: '', notes: '' });
    } catch (error) {
      console.error('Failed to add returning worker', error);
    } finally {
      setSavingReturningWorker(false);
    }
  };

  const handleMarkWorkerReturned = async (worker) => {
    if (!worker?.id) return;
    if ((worker.status || '').toLowerCase() === 'returned') return;

    try {
      setUpdatingReturningWorkerId(worker.id);
      await updateDoc(doc(db, 'returningWorkers', worker.id), {
        status: 'returned',
        returnedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to mark worker as returned', error);
    } finally {
      setUpdatingReturningWorkerId(null);
    }
  };

  const handleSaveAbout = async (event) => {
    event.preventDefault();
    const aboutForm = event.target;
    const formData = new FormData(aboutForm);
    const title = formData.get('aboutTitle')?.trim() || '';
    const description = formData.get('aboutDescription')?.trim() || '';
    const mission = formData.get('aboutMission')?.trim() || '';
    const vision = formData.get('aboutVision')?.trim() || '';

    if (!title || !description) {
      return;
    }

    try {
      setSavingAbout(true);
      const aboutRef = doc(db, 'about', 'content');
      await setDoc(
        aboutRef,
        {
          title,
          description,
          mission,
          vision,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Failed to save about content', error);
    } finally {
      setSavingAbout(false);
    }
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setNewTestimonial({ name: '', role: '', content: '', image: '' });
    setNewTestimonialFile(null);
    setTestimonialFileKey((prev) => prev + 1);
  };

  const openTestimonialModalForCreate = () => {
    resetTestimonialForm();
    setIsTestimonialModalOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonialId(testimonial.id);
    setNewTestimonial({
      name: testimonial.name || '',
      role: testimonial.role || '',
      content: testimonial.content || '',
      image: testimonial.image || '',
    });
    setNewTestimonialFile(null);
    setTestimonialFileKey((prev) => prev + 1);
    setIsTestimonialModalOpen(true);
  };

  const handleCancelTestimonialEdit = () => {
    setIsTestimonialModalOpen(false);
    resetTestimonialForm();
  };

  const handleDeleteTestimonial = async (testimonial) => {
    if (!testimonial?.id) {
      return;
    }
    const shouldDelete = window.confirm(`Delete testimonial from "${testimonial.name || 'this person'}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingTestimonialId(testimonial.id);
      await deleteDoc(doc(db, 'testimonials', testimonial.id));
      if (testimonial.storagePath) {
        try {
          await deleteObject(ref(storage, testimonial.storagePath));
        } catch (error) {
          console.error('Failed to delete testimonial image from storage', error);
        }
      }
      if (editingTestimonialId === testimonial.id) {
        handleCancelTestimonialEdit();
      }
    } catch (error) {
      console.error('Failed to delete testimonial', error);
    } finally {
      setDeletingTestimonialId(null);
    }
  };

  const handleSaveTestimonial = async (event) => {
    event.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      return;
    }

    try {
      setSavingTestimonial(true);
      const trimmedName = newTestimonial.name.trim();
      const trimmedRole = newTestimonial.role.trim();
      const trimmedContent = newTestimonial.content.trim();
      const isEditing = Boolean(editingTestimonialId);
      let uploadedImageUrl = '';
      let uploadedStoragePath = '';
      let previousStoragePath = '';

      // File is optional for both create and edit

      if (newTestimonialFile) {
        uploadedStoragePath = `testimonials/${Date.now()}-${newTestimonialFile.name.replace(/\s+/g, '-')}`;
        const fileRef = ref(storage, uploadedStoragePath);
        await uploadBytes(fileRef, newTestimonialFile);
        uploadedImageUrl = await getDownloadURL(fileRef);
      }

      if (isEditing && editingTestimonialId) {
        const testimonialRef = doc(db, 'testimonials', editingTestimonialId);
        const existingTestimonial = testimonials.find((t) => t.id === editingTestimonialId);
        if (existingTestimonial?.storagePath) {
          previousStoragePath = existingTestimonial.storagePath;
        }

        const updates = {
          name: trimmedName,
          role: trimmedRole,
          content: trimmedContent,
        };

        if (newTestimonialFile) {
          updates.image = uploadedImageUrl;
          updates.storagePath = uploadedStoragePath;
        }

        await updateDoc(testimonialRef, updates);

        if (newTestimonialFile && previousStoragePath) {
          try {
            await deleteObject(ref(storage, previousStoragePath));
          } catch (error) {
            console.error('Failed to delete previous testimonial image', error);
          }
        }
      } else {
        await addDoc(collection(db, 'testimonials'), {
          name: trimmedName,
          role: trimmedRole,
          content: trimmedContent,
          image: uploadedImageUrl,
          storagePath: uploadedStoragePath,
          createdAt: serverTimestamp(),
        });
      }

      resetTestimonialForm();
      setIsTestimonialModalOpen(false);
    } catch (error) {
      console.error('Failed to save testimonial', error);
    } finally {
      setSavingTestimonial(false);
    }
  };

  const handleUpdateSponsorshipStatus = async (sponsorshipId, newStatus) => {
    try {
      setUpdatingSponsorshipId(sponsorshipId);
      const sponsorshipRef = doc(db, 'sponsors', sponsorshipId);
      await updateDoc(sponsorshipRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to update sponsorship status', error);
    } finally {
      setUpdatingSponsorshipId(null);
    }
  };

  const handleDeleteSponsorship = async (sponsorship) => {
    if (!sponsorship?.id) {
      return;
    }
    const shouldDelete = window.confirm(`Delete sponsorship from "${sponsorship.companyName || 'this sponsor'}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setUpdatingSponsorshipId(sponsorship.id);
      await deleteDoc(doc(db, 'sponsors', sponsorship.id));
    } catch (error) {
      console.error('Failed to delete sponsorship', error);
    } finally {
      setUpdatingSponsorshipId(null);
    }
  };

  const programsCount = programs.length;
  const galleryCount = galleryItems.length;
  const messageCount = messages.length;
  const sponsorshipCount = sponsorships.length;
  const pendingSponsorshipsCount = sponsorships.filter((s) => s.status === 'pending').length;
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

          {activeTab === 'about' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">About Content</h2>
                  <p className="text-sm text-slate-500">
                    Manage the about page content including title, description, mission, and vision.
                  </p>
                </div>
              </header>
              {aboutLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading about content…
                </div>
              ) : (
                <form className="grid gap-6" onSubmit={handleSaveAbout}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-600">Title</label>
                      <input
                        type="text"
                        name="aboutTitle"
                        defaultValue={aboutData?.title || ''}
                        placeholder="Enter about page title"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-600">Description</label>
                      <textarea
                        name="aboutDescription"
                        defaultValue={aboutData?.description || ''}
                        rows={6}
                        placeholder="Enter about page description"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-600">Mission</label>
                      <textarea
                        name="aboutMission"
                        defaultValue={aboutData?.mission || ''}
                        rows={4}
                        placeholder="Enter mission statement"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-600">Vision</label>
                      <textarea
                        name="aboutVision"
                        defaultValue={aboutData?.vision || ''}
                        rows={4}
                        placeholder="Enter vision statement"
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={savingAbout}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
                    >
                      {savingAbout ? 'Saving…' : 'Save About Content'}
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}

          {activeTab === 'sponsorships' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Sponsorships</h2>
                  <p className="text-sm text-slate-500">
                    Manage sponsorship applications. Approve or reject sponsorship requests.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">Total Sponsorships</p>
                    <p className="text-2xl font-semibold text-slate-900">{sponsorshipCount}</p>
                  </div>
                  {pendingSponsorshipsCount > 0 && (
                    <div className="rounded-full bg-amber-100 px-4 py-2">
                      <p className="text-xs font-semibold text-amber-700">
                        {pendingSponsorshipsCount} Pending
                      </p>
                    </div>
                  )}
                </div>
              </header>
              {sponsorshipsLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading sponsorships…
                </div>
              ) : sponsorships.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  No sponsorship applications yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Company</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Amount</th>
                        <th className="px-4 py-3 font-semibold">Payment Method</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {sponsorships.map((sponsorship) => (
                        <tr key={sponsorship.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-slate-900">{sponsorship.companyName}</p>
                              {sponsorship.websiteUrl && (
                                <a
                                  href={sponsorship.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-600 hover:underline"
                                >
                                  {sponsorship.websiteUrl}
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="max-w-md text-sm text-slate-600 line-clamp-2">
                              {sponsorship.description}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            {sponsorship.amount ? (
                              <span className="font-semibold text-slate-900">
                                ${typeof sponsorship.amount === 'number' 
                                  ? sponsorship.amount.toFixed(2)
                                  : parseFloat(sponsorship.amount).toFixed(2)} AUD
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700">
                              {sponsorship.paymentMethod === 'paypal' ? 'PayPal' : 'Cash/Transfer'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                sponsorship.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : sponsorship.status === 'rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {sponsorship.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {sponsorship.createdAt?.toDate
                              ? sponsorship.createdAt.toDate().toLocaleDateString()
                              : 'N/A'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              {sponsorship.status === 'pending' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateSponsorshipStatus(sponsorship.id, 'approved')}
                                    disabled={updatingSponsorshipId === sponsorship.id}
                                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <FiCheck />
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateSponsorshipStatus(sponsorship.id, 'rejected')}
                                    disabled={updatingSponsorshipId === sponsorship.id}
                                    className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <FiXCircle />
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteSponsorship(sponsorship)}
                                disabled={updatingSponsorshipId === sponsorship.id}
                                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <FiTrash2 />
                                {updatingSponsorshipId === sponsorship.id ? '...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'reintegration' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Return & Reintegration</h2>
                  <p className="text-sm text-slate-500">
                    Track returning workers and mark when a worker has successfully returned.
                  </p>
                </div>
              </header>

              <form
                onSubmit={handleAddReturningWorker}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-3"
              >
                <div className="grid gap-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-600">Full name</label>
                  <input
                    value={newReturningWorker.fullName}
                    onChange={(event) =>
                      setNewReturningWorker((prev) => ({ ...prev, fullName: event.target.value }))
                    }
                    placeholder="e.g., John Mwangi"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </div>
                <div className="grid gap-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-600">Phone (optional)</label>
                  <input
                    value={newReturningWorker.phone}
                    onChange={(event) =>
                      setNewReturningWorker((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    placeholder="+254..."
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="grid gap-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-600">Notes (optional)</label>
                  <input
                    value={newReturningWorker.notes}
                    onChange={(event) =>
                      setNewReturningWorker((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    placeholder="Short note"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingReturningWorker}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
                  >
                    <FiPlusCircle />
                    {savingReturningWorker ? 'Saving…' : 'Add returning worker'}
                  </button>
                </div>
              </form>

              {returningWorkersLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading returning workers…
                </div>
              ) : returningWorkers.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  No returning workers yet.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Worker</th>
                        <th className="px-4 py-3 font-semibold">Phone</th>
                        <th className="px-4 py-3 font-semibold">Notes</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {returningWorkers.map((worker) => {
                        const status = (worker.status || 'active').toLowerCase();
                        const isReturned = status === 'returned';
                        const isUpdating = updatingReturningWorkerId === worker.id;

                        return (
                          <tr key={worker.id} className={isReturned ? 'bg-emerald-50/60' : ''}>
                            <td className="px-4 py-3">
                              <p className="font-semibold text-slate-900">{worker.fullName || '—'}</p>
                              {worker.createdAt?.toDate && (
                                <p className="text-xs text-slate-500">
                                  Added {worker.createdAt.toDate().toLocaleDateString()}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{worker.phone || '—'}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              <p className="line-clamp-2 max-w-md">{worker.notes || '—'}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  isReturned
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {isReturned ? 'Returned' : 'Active'}
                              </span>
                              {worker.returnedAt?.toDate && (
                                <p className="mt-2 text-xs text-slate-500">
                                  Returned {worker.returnedAt.toDate().toLocaleDateString()}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleMarkWorkerReturned(worker)}
                                  disabled={isReturned || isUpdating}
                                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  <FiCheck />
                                  {isReturned ? 'Returned' : isUpdating ? 'Updating…' : 'Mark as Returned'}
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

          {activeTab === 'testimonials' && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Testimonials</h2>
                  <p className="text-sm text-slate-500">
                    Manage testimonials from supporters and beneficiaries. Add, edit, or remove testimonials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openTestimonialModalForCreate}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
                >
                  <FiPlusCircle />
                  Add Testimonial
                </button>
              </header>
              {testimonialsLoading ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  Loading testimonials…
                </div>
              ) : testimonials.length === 0 ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-sm font-semibold text-slate-500">
                  No testimonials added yet.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials.map((testimonial) => {
                    const imageSrc = testimonial.image || testimonial.imageUrl || '';
                    return (
                      <div
                        key={testimonial.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={testimonial.name}
                              className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <FiStar className="text-emerald-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-900">{testimonial.name}</h3>
                            {testimonial.role && (
                              <p className="text-xs text-slate-500 mt-1">{testimonial.role}</p>
                            )}
                            <p className="text-sm text-slate-600 mt-2 line-clamp-3">{testimonial.content}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <FiEdit />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTestimonial(testimonial)}
                            disabled={deletingTestimonialId === testimonial.id}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <FiTrash2 />
                            {deletingTestimonialId === testimonial.id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
      {isTestimonialModalOpen && (
        <DashboardModal
          title={editingTestimonialId ? 'Edit testimonial' : 'Add testimonial'}
          description="Add or edit testimonials from supporters and beneficiaries."
          onClose={handleCancelTestimonialEdit}
        >
          <form className="grid gap-4" onSubmit={handleSaveTestimonial}>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Name</label>
              <input
                value={newTestimonial.name}
                onChange={(event) =>
                  setNewTestimonial((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Person's name"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Role/Title</label>
              <input
                value={newTestimonial.role}
                onChange={(event) =>
                  setNewTestimonial((prev) => ({ ...prev, role: event.target.value }))
                }
                placeholder="e.g., Volunteer, Beneficiary, Donor"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">Testimonial Content</label>
              <textarea
                value={newTestimonial.content}
                onChange={(event) =>
                  setNewTestimonial((prev) => ({ ...prev, content: event.target.value }))
                }
                rows={5}
                placeholder="Enter the testimonial text"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-600">
                {editingTestimonialId ? 'Replace photo (optional)' : 'Upload photo (optional)'}
              </label>
              <input
                key={testimonialFileKey}
                type="file"
                accept="image/*"
                onChange={(event) => setNewTestimonialFile(event.target.files?.[0] || null)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              <p className="text-xs text-slate-500">
                Upload a profile photo for the testimonial (optional).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={savingTestimonial}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                <FiPlusCircle />
                {savingTestimonial
                  ? editingTestimonialId
                    ? 'Saving changes…'
                    : 'Saving…'
                  : editingTestimonialId
                    ? 'Save changes'
                    : 'Add testimonial'}
              </button>
              <button
                type="button"
                onClick={handleCancelTestimonialEdit}
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

