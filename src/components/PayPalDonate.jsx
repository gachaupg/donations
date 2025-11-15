import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

const FALLBACK_CLIENT_ID = 'AZGhCApG2AjViQUvZnjJUn2QncpLsI_bvX19sRpeOaAcIjlc5VqYPClWwb94xfweI4WL4dj7-lwvuDE_';
const FALLBACK_APP_NAME = 'donations';
const FALLBACK_SECRET_KEY =
  'ELyhX1BpJCMtYHqTvwDg_s8F-kOXIkQF7SnOMLBudyBBVvRU694VQ57goncR7pKA7HhVtsmk4ZcwaBwW';

const PayPalDonate = () => {
  const envClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const envAppName = import.meta.env.VITE_PAYPAL_APP_NAME;
  const envSecretKey = import.meta.env.VITE_PAYPAL_SECRET_KEY;
  const clientId = envClientId || FALLBACK_CLIENT_ID;
  const appName = envAppName || FALLBACK_APP_NAME;
  const secretKey = envSecretKey || FALLBACK_SECRET_KEY;
  const usingFallbackClientId = !envClientId;
  const containerRef = useRef(null);
  const buttonInstanceRef = useRef(null);
  const [amount, setAmount] = useState('25.00');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const parsedAmount = useMemo(() => {
    const value = parseFloat(amount);
    return Number.isFinite(value) && value > 0 ? value.toFixed(2) : null;
  }, [amount]);

  useEffect(() => {
    if (!clientId) {
      setError('Missing PayPal client ID. Please set VITE_PAYPAL_CLIENT_ID in your environment.');
      setLoading(false);
      return;
    }

    // Check if PayPal SDK is already loaded
    if (window.paypal && typeof window.paypal.Buttons === 'function') {
      setLoading(false);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
    if (existingScript) {
      // Wait for SDK to load if script exists but SDK isn't ready
      const checkSDK = setInterval(() => {
        if (window.paypal && typeof window.paypal.Buttons === 'function') {
          clearInterval(checkSDK);
          setLoading(false);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkSDK);
        if (!window.paypal || typeof window.paypal.Buttons !== 'function') {
          setError('PayPal SDK is taking too long to load. Please refresh the page.');
          setLoading(false);
        }
      }, 10000);
      
      existingScript.addEventListener('error', () => {
        clearInterval(checkSDK);
        setError('Unable to load PayPal SDK. Check your network connection.');
        setLoading(false);
      });
      
      return () => clearInterval(checkSDK);
    }

    const script = document.createElement('script');
    // Ensure we're using the live PayPal endpoint (not sandbox) with AUD currency and Australian locale
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=AUD&locale=en_AU&intent=capture&components=buttons`;
    script.async = true;
    script.onload = () => {
      // Give it a moment for the SDK to fully initialize
      setTimeout(() => {
        if (window.paypal && typeof window.paypal.Buttons === 'function') {
          setLoading(false);
        } else {
          console.error('PayPal SDK state:', {
            paypal: !!window.paypal,
            Buttons: !!window.paypal?.Buttons,
            paypalType: typeof window.paypal
          });
          setError('PayPal SDK loaded but buttons are not available. Please refresh the page.');
          setLoading(false);
        }
      }, 200);
    };
    script.onerror = () => {
      setError('Unable to load PayPal SDK. Check your network connection.');
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      // Only remove if we added it
      if (script.parentNode) {
        try {
          document.body.removeChild(script);
        } catch (e) {
          // Script might already be removed
        }
      }
    };
  }, [clientId]);

  useEffect(() => {
    // If invalid amount, just clear the container but don't try to render
    if (!parsedAmount && containerRef.current) {
      // Clear any existing button instance
      if (buttonInstanceRef.current) {
        try {
          // PayPal buttons don't have a direct close method, but clearing the container should work
          buttonInstanceRef.current = null;
        } catch (e) {
          console.warn('Error cleaning up button instance:', e);
        }
      }
      containerRef.current.innerHTML = '';
      // Clear error state when amount is invalid so we can retry when valid again
      if (error) {
        setError('');
      }
      return;
    }

    // Clear error when amount becomes valid again (but don't check error in condition to avoid loop)
    if (parsedAmount && error) {
      setError('');
    }

    // Don't render if still loading, no valid amount, or PayPal not ready
    if (loading || !parsedAmount || !window.paypal || typeof window.paypal.Buttons !== 'function' || !containerRef.current) {
      return;
    }

    // If there's an error but we have valid amount, try to render anyway (error might be stale)
    // The error check above will prevent this, so we'll retry after clearing error

    // Clear any existing button instance first
    if (buttonInstanceRef.current) {
      try {
        buttonInstanceRef.current = null;
      } catch (e) {
        console.warn('Error cleaning up previous button instance:', e);
      }
    }

    // Clear container completely
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    let buttonInstance = null;
    let renderTimeout = null;

    // Define the render function before using it
    const renderButtonInstance = () => {
      if (!containerRef.current || !window.paypal || typeof window.paypal.Buttons !== 'function') {
        return;
      }

      try {
        buttonInstance = window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'donate',
          },
          onInit: (data, actions) => {
            // Check if the account is properly configured
            console.log('PayPal button initialized', {
              clientId: clientId.substring(0, 20) + '...',
              appName,
              accountType: usingFallbackClientId ? 'FALLBACK' : 'ENV',
            });
            // onInit doesn't need to return anything
          },
          createOrder: (data, actions) => {
            console.log('Creating PayPal order', {
              amount: parsedAmount,
              currency: 'AUD',
              clientId: clientId.substring(0, 20) + '...',
            });
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
                  description: `${appName} donation`,
                },
              ],
            }).catch((err) => {
              console.error('PayPal createOrder error:', {
                error: err,
                message: err.message,
                details: err.details,
                name: err.name,
                clientId: clientId.substring(0, 20) + '...',
              });
              
              // More specific error handling
              let errorMsg = 'Unable to create payment order.';
              if (err.details && Array.isArray(err.details)) {
                const firstError = err.details[0];
                if (firstError.issue) {
                  errorMsg = `PayPal error: ${firstError.issue}. ${firstError.description || ''}`;
                }
              } else if (err.message) {
                errorMsg = `PayPal error: ${err.message}`;
              }
              
              toast.error(errorMsg + ' Please check your PayPal account configuration.');
              throw err;
            });
          },
          onApprove: async (data, actions) => {
            try {
              console.log('PayPal order approved', {
                orderID: data.orderID,
                payerID: data.payerID,
                clientId: clientId.substring(0, 20) + '...',
              });
              
              const details = await actions.order.capture().catch((captureErr) => {
                console.error('Order capture failed:', {
                  error: captureErr,
                  message: captureErr.message,
                  details: captureErr.details,
                  orderID: data.orderID,
                });
                throw captureErr;
              });
              
              const capture = details?.purchase_units?.[0]?.payments?.captures?.[0] ?? {};
              console.log('Payment captured successfully:', capture);
              
              // Save to Firebase
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
                toast.success('Thank you for your donation!');
              } catch (firebaseErr) {
                console.error('Firebase error:', firebaseErr);
                // Payment succeeded even if Firebase save failed
                toast.success('Payment successful! Thank you for your donation.');
              }
            } catch (err) {
              console.error('PayPal approval error:', err);
              console.error('Error details:', JSON.stringify(err, null, 2));
              
              // Handle specific PayPal errors
              if (err.message?.includes('PAYMENT_DENIED') || err.details?.[0]?.issue === 'PAYMENT_DENIED') {
                toast.error('Payment was denied. Please check your PayPal account or contact support.');
              } else if (err.message?.includes('INSTRUMENT_DECLINED')) {
                toast.error('Your payment method was declined. Please try a different payment method.');
              } else {
                toast.error('Unable to complete the payment. Please try again or use a different payment method.');
              }
            }
          },
          onError: (err) => {
            console.error('PayPal button error:', {
              error: err,
              message: err.message,
              details: err.details,
              name: err.name,
              stack: err.stack,
              clientId: clientId.substring(0, 20) + '...',
            });
            
            // Parse error details if available
            let errorMessage = 'Unable to process PayPal donation right now.';
            
            // Check for specific error codes
            if (err.details && Array.isArray(err.details)) {
              const firstError = err.details[0];
              if (firstError.issue) {
                console.error('PayPal error issue:', firstError.issue);
                
                if (firstError.issue === 'PAYMENT_DENIED') {
                  errorMessage = 'Payment denied: This PayPal account may have restrictions. Check account status in PayPal Developer Dashboard.';
                } else if (firstError.issue === 'INSTRUMENT_DECLINED') {
                  errorMessage = 'Payment method declined. Please try a different card or payment method.';
                } else if (firstError.issue === 'INVALID_REQUEST') {
                  errorMessage = `Invalid request: ${firstError.description || 'Check your PayPal app configuration.'}`;
                } else if (firstError.issue === 'NOT_AUTHORIZED') {
                  errorMessage = 'Not authorized: This client ID may not be approved for live payments. Check PayPal Developer Dashboard.';
                } else {
                  errorMessage = `PayPal error: ${firstError.issue}. ${firstError.description || ''}`;
                }
              }
            } else if (err.message) {
              if (err.message.includes('PAYMENT_DENIED')) {
                errorMessage = 'Payment was denied. Check your PayPal account configuration in Developer Dashboard.';
              } else if (err.message.includes('INSTRUMENT_DECLINED')) {
                errorMessage = 'Your payment method was declined. Please try another card or payment method.';
              } else {
                errorMessage = `PayPal error: ${err.message}`;
              }
            }
            
            console.error('Final error message:', errorMessage);
            toast.error(errorMessage);
            setError(errorMessage);
          },
          onCancel: () => {
            // User cancelled - no error needed
          },
        });

        if (containerRef.current && buttonInstance) {
          // Store the button instance in ref
          buttonInstanceRef.current = buttonInstance;
          
          buttonInstance.render(containerRef.current).then(() => {
            console.log('PayPal button rendered successfully');
          }).catch((renderErr) => {
            console.error('PayPal button render error:', renderErr);
            buttonInstanceRef.current = null;
            // Only set error if it's a real error, not just a cleanup
            if (containerRef.current && containerRef.current.innerHTML.trim() === '') {
              setError('Unable to render PayPal button. Please refresh the page.');
            }
          });
        }
      } catch (btnErr) {
        console.error('PayPal Buttons creation error:', btnErr);
        buttonInstanceRef.current = null;
        setError('Unable to initialize PayPal. Please check your credentials.');
      }
    };

    // Small delay to ensure container is ready and any previous state is cleared
    renderTimeout = setTimeout(() => {
      if (!containerRef.current || !window.paypal || typeof window.paypal.Buttons !== 'function') {
        console.error('PayPal Buttons not available when trying to render');
        return;
      }

      // Ensure container is completely empty and ready for new render
      if (containerRef.current.innerHTML.trim() !== '') {
        containerRef.current.innerHTML = '';
        // Give a moment for DOM to update before re-rendering
        setTimeout(() => {
          if (!containerRef.current || !window.paypal || typeof window.paypal.Buttons !== 'function') {
            return;
          }
          renderButtonInstance();
        }, 50);
        return;
      }
      
      renderButtonInstance();
    }, 100);

    return () => {
      if (renderTimeout) {
        clearTimeout(renderTimeout);
      }
      // Clear button instance reference
      if (buttonInstanceRef.current) {
        buttonInstanceRef.current = null;
      }
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parsedAmount, loading, error, appName, clientId]);

  useEffect(() => {
    if (!secretKey) {
      console.warn('Missing PayPal secret key. Please configure VITE_PAYPAL_SECRET_KEY for secure server-side operations.');
    }
  }, [secretKey]);

  return (
    <div className="rounded-3xl border border-emerald-200 bg-white/95 p-8 shadow-2xl shadow-emerald-500/10">
      <header className="mb-6 space-y-2 text-center">
        <h3 className="text-2xl font-semibold text-slate-900">Donate Securely with PayPal</h3>
        <p className="text-sm text-slate-600">
          Every contribution helps us extend critical support to vulnerable communities.
        </p>
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,180px)] sm:items-center">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">
            Donation amount (AUD)
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="25.00"
          />
      {usingFallbackClientId && (
        <p className="text-[11px] text-slate-400">
          Using bundled live credentials for testing. Move these keys into secure environment variables before deploying.
        </p>
      )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 px-3 py-1">
            Secure checkout
          </span>
          <span className="rounded-full border border-slate-200 px-3 py-1">
            Instant confirmation
          </span>
          <span className="rounded-full border border-slate-200 px-3 py-1">
            Tax deductible
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="relative flex min-h-[60px] items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="relative">
              <div className="w-10 h-10 border-4 border-emerald-200/30 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-emerald-700">Loading PayPal…</p>
          </div>
        )}
        {!error && <div ref={containerRef} className="w-full" />}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Your payment is processed securely by PayPal. Configure live credentials via environment variables for production.
      </p>
    </div>
  );
};

export default PayPalDonate;

