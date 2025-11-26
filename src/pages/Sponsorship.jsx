import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, where, onSnapshot as onSnapshotListener } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { FiHeart, FiUsers, FiDollarSign, FiGlobe, FiFileText, FiCheckCircle, FiAward, FiCopy } from 'react-icons/fi';

// Simple PayPal Buttons Component - just the buttons
const PayPalButtonsOnly = ({ amount, onPaymentSuccess }) => {
  const containerRef = useRef(null);
  const buttonInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const paymentConfirmedRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  const parsedAmount = useMemo(() => {
    const value = parseFloat(amount);
    return Number.isFinite(value) && value > 0 ? value.toFixed(2) : null;
  }, [amount]);

  const FALLBACK_CLIENT_ID = 'AZGhCApG2AjViQUvZnjJUn2QncpLsI_bvX19sRpeOaAcIjlc5VqYPClWwb94xfweI4WL4dj7-lwvuDE_';
  const envClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const clientId = envClientId || FALLBACK_CLIENT_ID;
  const appName = import.meta.env.VITE_PAYPAL_APP_NAME || 'donations';

  // Load PayPal SDK
  useEffect(() => {
    if (!clientId) {
      setError('Missing PayPal client ID');
      setLoading(false);
      return;
    }

    if (window.paypal && typeof window.paypal.Buttons === 'function') {
      setLoading(false);
      return;
    }

    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingScript) {
      const checkSDK = setInterval(() => {
        if (window.paypal && typeof window.paypal.Buttons === 'function') {
          clearInterval(checkSDK);
          setLoading(false);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkSDK);
        if (!window.paypal || typeof window.paypal.Buttons !== 'function') {
          setError('PayPal SDK loading timeout');
          setLoading(false);
        }
      }, 10000);
      return () => clearInterval(checkSDK);
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=AUD&locale=en_AU&intent=capture&components=buttons`;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.paypal && typeof window.paypal.Buttons === 'function') {
          setLoading(false);
        } else {
          setError('PayPal SDK loaded but buttons not available');
          setLoading(false);
        }
      }, 200);
    };
    script.onerror = () => {
      setError('Unable to load PayPal SDK');
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        try {
          document.body.removeChild(script);
        } catch (e) {}
      }
    };
  }, [clientId]);

  // Listen for payment completion
  useEffect(() => {
    if (!amount || paymentConfirmedRef.current) return;

    const transactionsQuery = query(
      collection(db, 'transactions'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshotListener(
      transactionsQuery,
      (snapshot) => {
        if (snapshot.empty || paymentConfirmedRef.current) return;
        
        snapshot.docs.forEach((doc) => {
          const transaction = doc.data();
          const transactionTime = transaction.createdAt?.toDate?.() || new Date();
          const timeDiff = (new Date() - transactionTime) / 1000;
          
          if (transactionTime.getTime() < startTimeRef.current) return;
          
          const transactionAmount = typeof transaction.amount === 'number' 
            ? transaction.amount 
            : parseFloat(transaction.amount || 0);
          const formAmount = parseFloat(amount);
          
          if (
            Math.abs(transactionAmount - formAmount) < 0.01 && 
            timeDiff < 300 &&
            transaction.status === 'COMPLETED' &&
            !paymentConfirmedRef.current
          ) {
            paymentConfirmedRef.current = true;
            onPaymentSuccess();
            unsubscribe();
          }
        });
      },
      (error) => {
        console.error('Error listening to transactions:', error);
      }
    );

    return () => unsubscribe();
  }, [amount, onPaymentSuccess]);

  // Render PayPal buttons
  useEffect(() => {
    if (loading || !parsedAmount || !window.paypal || typeof window.paypal.Buttons !== 'function' || !containerRef.current) {
      return;
    }

    if (buttonInstanceRef.current) {
      buttonInstanceRef.current = null;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    let buttonInstance = null;

    try {
      buttonInstance = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'donate',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            application_context: {
              brand_name: appName,
              locale: 'en-AU',
              landing_page: 'BILLING',
            },
            purchase_units: [
              {
                amount: {
                  currency_code: 'AUD',
                  value: parsedAmount,
                },
                description: `${appName} sponsorship`,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            const capture = details?.purchase_units?.[0]?.payments?.captures?.[0] ?? {};
            
            try {
              await addDoc(collection(db, 'transactions'), {
                orderId: details.id,
                payerEmail: details?.payer?.email_address ?? '',
                payerName: `${details?.payer?.name?.given_name ?? ''} ${
                  details?.payer?.name?.surname ?? ''
                }`.trim(),
                amount: parseFloat(capture.amount?.value ?? parsedAmount),
                currency: capture.amount?.currency_code ?? 'AUD',
                status: capture.status ?? details.status ?? 'COMPLETED',
                createdAt: serverTimestamp(),
                source: 'paypal',
              });
              toast.success('Payment confirmed!');
              onPaymentSuccess();
            } catch (firebaseErr) {
              console.error('Firebase error:', firebaseErr);
              toast.success('Payment successful!');
              onPaymentSuccess();
            }
          } catch (err) {
            console.error('PayPal approval error:', err);
            toast.error('Unable to complete the payment. Please try again.');
          }
        },
        onError: (err) => {
          console.error('PayPal button error:', err);
          toast.error('Unable to process PayPal payment right now.');
          setError('Payment error occurred');
        },
      });

      if (containerRef.current && buttonInstance) {
        buttonInstanceRef.current = buttonInstance;
        buttonInstance.render(containerRef.current).catch((renderErr) => {
          console.error('PayPal button render error:', renderErr);
          buttonInstanceRef.current = null;
        });
      }
    } catch (btnErr) {
      console.error('PayPal Buttons creation error:', btnErr);
      setError('Unable to initialize PayPal');
    }

    return () => {
      if (buttonInstanceRef.current) {
        buttonInstanceRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parsedAmount, loading, appName, clientId, onPaymentSuccess]);

  if (!parsedAmount) return null;

  return (
    <div className="relative flex min-h-[56px] items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200/30 border-t-emerald-600"></div>
        </div>
      )}
      {error && (
        <div className="text-xs text-red-400">{error}</div>
      )}
      {!error && <div ref={containerRef} className="w-full" />}
    </div>
  );
};

const Sponsorship = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    description: '',
    amount: '',
    paymentMethod: 'paypal',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  // Current sponsors (hardcoded)
  const currentSponsors = [
    {
      id: 'petergachau',
      companyName: 'Peter Gachau',
      websiteUrl: 'https://www.petergachau.co.ke/',
      description: 'Software Developed - Sponsored the website',
      amount: 'Website Development',
      paymentMethod: 'cash',
    },
  ];

  useEffect(() => {
    // Load approved sponsors from Firebase - updates automatically when sponsors are approved in dashboard
    const sponsorsQuery = query(collection(db, 'sponsors'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      sponsorsQuery,
      (snapshot) => {
        const docs = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((doc) => doc.status === 'approved');
        setSponsors(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Failed to load sponsors', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Reset payment confirmation if payment method or amount changes
    if (name === 'paymentMethod' || name === 'amount') {
      setPaymentConfirmed(false);
    }
  };

  const handleCopy = useCallback((text, key) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(''), 2000);
      })
      .catch(() => {
        setCopiedKey('');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form
      if (!formData.companyName.trim()) {
        toast.error('Please enter your company name');
        setSubmitting(false);
        return;
      }
      if (!formData.description.trim()) {
        toast.error('Please enter a description');
        setSubmitting(false);
        return;
      }
      if (formData.paymentMethod === 'paypal' && !formData.amount) {
        toast.error('Please enter the sponsorship amount');
        setSubmitting(false);
        return;
      }

      // For PayPal, require payment confirmation before submission
      if (formData.paymentMethod === 'paypal' && !paymentConfirmed) {
        toast.error('Please complete the PayPal payment first');
        setSubmitting(false);
        return;
      }

      // Save to Firebase
      await addDoc(collection(db, 'sponsors'), {
        companyName: formData.companyName.trim(),
        websiteUrl: formData.websiteUrl.trim() || '',
        description: formData.description.trim(),
        amount: formData.amount ? parseFloat(formData.amount) : null,
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      toast.success('Thank you! Your sponsorship application has been submitted. We will contact you soon.');
      
      // Reset form
      setFormData({
        companyName: '',
        websiteUrl: '',
        description: '',
        amount: '',
        paymentMethod: 'paypal',
      });
      setPaymentConfirmed(false);
    } catch (error) {
      console.error('Error submitting sponsorship:', error);
      toast.error('Failed to submit sponsorship. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const allSponsors = [...currentSponsors, ...sponsors];

  return (
    <div className="min-h-[calc(100vh-80px)] pt-6 pb-12 px-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Hero Section */}
        <header className="mb-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-50/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 backdrop-blur-sm">
            <FiHeart className="text-emerald-400" />
            Support Our Mission
          </div>
        </header>

        {/* Main Content Grid - Text and Form in Row */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Become a Sponsor Text Content */}
          <div className="rounded-[28px] border border-emerald-200/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
            <div className="space-y-4">
              <div className="space-y-4 text-sm leading-relaxed text-white/90">
                <p>
                  Through <strong className="text-emerald-300">love and sharing hearts</strong>, visits, and support programs, we work tirelessly to make a difference in the lives of those in need. By becoming a sponsor, you are supporting our foundation's mission to serve <strong className="text-emerald-300">prison organizations, charities, and communities</strong> across all our programs.
                </p>
                <p>
                  Your sponsorship enables us to continue our vital work, providing essential services, resources, and hope to those who need it most. Together, we can create lasting positive change.
                </p>
              </div>
            </div>
          </div>

          {/* Become a Sponsor Form */}
          <div className="rounded-[28px] border border-emerald-200/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="mb-2 block text-xs font-semibold text-white">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-emerald-200/40 bg-white/95 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label htmlFor="websiteUrl" className="mb-2 block text-xs font-semibold text-white">
                  Website URL
                </label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-emerald-200/40 bg-white/95 px-4 py-3 pl-10 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-xs font-semibold text-white">
                  Description <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FiFileText className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full rounded-xl border border-emerald-200/40 bg-white/95 px-4 py-3 pl-10 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50"
                    placeholder="Tell us about your sponsorship and how you'd like to support our foundation..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="paymentMethod" className="mb-2 block text-xs font-semibold text-white">
                  Payment Method <span className="text-red-400">*</span>
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-emerald-200/40 bg-white/95 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50"
                >
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash / Bank Transfer</option>
                </select>
              </div>

              {formData.paymentMethod === 'paypal' && (
                <div>
                  <label htmlFor="amount" className="mb-2 block text-xs font-semibold text-white">
                    Sponsorship Amount (AUD) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      min="1"
                      step="0.01"
                      required={formData.paymentMethod === 'paypal'}
                      className="w-full rounded-xl border border-emerald-200/40 bg-white/95 px-4 py-3 pl-10 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/50"
                      placeholder="0.00"
                    />
                  </div>
                  {formData.amount && (
                    <div className="mt-4">
                      <PayPalButtonsOnly 
                        amount={formData.amount} 
                        onPaymentSuccess={() => {
                          setPaymentConfirmed(true);
                          toast.success('Payment confirmed! You can now submit your sponsorship application.');
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || (formData.paymentMethod === 'paypal' && formData.amount && !paymentConfirmed)}
                className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting 
                  ? 'Submitting...' 
                  : formData.paymentMethod === 'paypal' && formData.amount && !paymentConfirmed
                  ? 'Complete Payment First'
                  : 'Submit Sponsorship Application'}
              </button>
            </form>

            {/* Payment Confirmation Message */}
            {formData.paymentMethod === 'paypal' && paymentConfirmed && (
              <div className="mt-4 rounded-xl border border-emerald-200/40 bg-emerald-50/20 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <FiCheckCircle className="text-base" />
                  <p className="text-xs font-semibold">Payment confirmed! You can now submit your sponsorship application.</p>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'cash' && (
              <div className="mt-6 space-y-4">
                <p className="text-xs font-semibold text-white/80">Bank Transfer Details:</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Australia - Account Name</p>
                      <p className="text-sm font-semibold text-white">Jane Nalianya</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('Jane Nalianya', 'aus-name')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'aus-name' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Australia - BSB</p>
                      <p className="text-sm font-semibold text-white">083495</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('083495', 'aus-bsb')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'aus-bsb' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Australia - Account</p>
                      <p className="text-sm font-semibold text-white">161373692</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('161373692', 'aus-account')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'aus-account' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Kenya - Account Name</p>
                      <p className="text-sm font-semibold text-white">Reuben Wairicu Foundation</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('Reuben Wairicu Foundation', 'ke-name')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'ke-name' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Kenya - Account Number</p>
                      <p className="text-sm font-semibold text-white">0330284842169</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('0330284842169', 'ke-account')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'ke-account' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Kenya - Bank</p>
                      <p className="text-sm font-semibold text-white">Equity Bank, Kitale</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('Equity Bank, Kitale', 'ke-bank')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'ke-bank' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200/30 bg-white/5 px-4 py-2">
                    <div>
                      <p className="text-[10px] text-white/60">Kenya - Mpesa</p>
                      <p className="text-sm font-semibold text-white">+254 723 237149</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+254 723 237149', 'ke-mpesa')}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200/40 px-2 py-1 text-[10px] text-emerald-300 transition hover:bg-emerald-500/20"
                    >
                      <FiCopy className="text-xs" />
                      {copiedKey === 'ke-mpesa' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-12 rounded-[28px] border border-emerald-200/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
          <h2 className="mb-8 text-center text-2xl font-semibold text-white">Why Sponsor Us?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/30 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:bg-white/10">
              <div className="rounded-full bg-emerald-500/20 p-4">
                <FiHeart className="text-3xl text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Make a Difference</h3>
              <p className="text-xs leading-relaxed text-white/80">
                Your support directly impacts lives through our programs and initiatives.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/30 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:bg-white/10">
              <div className="rounded-full bg-emerald-500/20 p-4">
                <FiUsers className="text-3xl text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Community Impact</h3>
              <p className="text-xs leading-relaxed text-white/80">
                Support prison organizations, charities, and vulnerable communities.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/30 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:bg-white/10">
              <div className="rounded-full bg-emerald-500/20 p-4">
                <FiDollarSign className="text-3xl text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Flexible Support</h3>
              <p className="text-xs leading-relaxed text-white/80">
                Choose your sponsorship amount and payment method that works for you.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/30 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:bg-white/10">
              <div className="rounded-full bg-emerald-500/20 p-4">
                <FiAward className="text-3xl text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Recognition</h3>
              <p className="text-xs leading-relaxed text-white/80">
                Get featured as a valued sponsor supporting our foundation's mission.
              </p>
            </div>
          </div>
        </section>

        {/* Our Sponsors Section */}
        <section className="mb-12 rounded-[28px] border border-emerald-200/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
          <header className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">Our Sponsors</h2>
            <p className="text-base text-white/80">
              We are grateful to our sponsors who make our work possible
            </p>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-emerald-200/30 border-t-emerald-400 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-xs text-white/70">Loading sponsors...</p>
            </div>
          ) : allSponsors.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-emerald-200/40 bg-emerald-50/10 py-16 text-center">
              <FiAward className="text-4xl text-emerald-400/50" />
              <p className="text-base font-semibold text-white">No sponsors yet.</p>
              <p className="max-w-md text-xs text-white/70">
                Be the first to sponsor our foundation and make a difference!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {allSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.websiteUrl || '#'}
                  target={sponsor.websiteUrl ? "_blank" : undefined}
                  rel={sponsor.websiteUrl ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-white/95 px-4 py-2 transition hover:border-emerald-300 hover:bg-emerald-50/50"
                >
                  <FiAward className="text-base text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">{sponsor.companyName}</span>
                  {sponsor.websiteUrl && (
                    <FiGlobe className="text-xs text-emerald-500 opacity-70 group-hover:opacity-100" />
                  )}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Additional Information */}
        <section className="rounded-[28px] border border-emerald-200/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10">
          <h2 className="mb-6 text-xl font-semibold text-white">About Our Sponsorship Program</h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/90">
            <p>
              Our foundation works with <strong className="text-emerald-300">prison organizations, charities, and community groups</strong> to provide essential services and support. Your sponsorship helps us:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Support all our programs and initiatives</li>
              <li>Provide resources to prison organizations and rehabilitation programs</li>
              <li>Assist charities and community groups in need</li>
              <li>Organize visits and community engagement activities</li>
              <li>Create lasting positive change through love and sharing</li>
            </ul>
            <p className="pt-4">
              Whether you choose PayPal for instant payment or prefer cash/bank transfer, your sponsorship makes a real difference. We will work with you to ensure your contribution is used effectively and transparently.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsorship;
