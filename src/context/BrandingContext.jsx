import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const BrandingContext = createContext({
  branding: null,
  loading: true,
});

export const BrandingProvider = ({ children }) => {
  const [branding, setBranding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const brandingRef = doc(db, 'branding', 'global');
    const unsubscribe = onSnapshot(
      brandingRef,
      (snapshot) => {
        setBranding(snapshot.exists() ? snapshot.data() : null);
        setLoading(false);
      },
      () => {
        setBranding(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      branding,
      loading,
    }),
    [branding, loading]
  );

  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
};

export const useBranding = () => useContext(BrandingContext);





