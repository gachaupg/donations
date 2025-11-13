import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

const FALLBACK_CLIENT_ID =
  'Ac6OOvH4cGPHr2X82iAfjFaeXNOHIIljFb18IZOj-fYHqzo8U_4gXxQ1FdNOVwhHT8QllPYcijs-A6ZH';
const FALLBACK_APP_NAME = 'peter';
const FALLBACK_SECRET_KEY =
  'EIuGzbO30n996acHhYVvoEA3iIdn0GYbJ9_pD69NrgXQTtjMui8Tl9i-p8r4nYX4Hk6OiCL2BT080EpD';

const PayPalDonate = () => {
  const envClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const envAppName = import.meta.env.VITE_PAYPAL_APP_NAME;
  const envSecretKey = import.meta.env.VITE_PAYPAL_SECRET_KEY;
  const clientId = envClientId || FALLBACK_CLIENT_ID;
  const appName = envAppName || FALLBACK_APP_NAME;
  const secretKey = envSecretKey || FALLBACK_SECRET_KEY;
  const usingFallbackClientId = !envClientId;
  const containerRef = useRef(null);
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

    if (window.paypal) {
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => setLoading(false);
    script.onerror = () => {
      setError('Unable to load PayPal SDK. Check your network connection.');
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  useEffect(() => {
    if (loading || error || !parsedAmount || !window.paypal || !containerRef.current) {
      return;
    }

    containerRef.current.innerHTML = '';

    const button = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'pill',
        label: 'donate',
      },
      createOrder: (_, actions) =>
        actions.order.create({
          application_context: {
            brand_name: appName,
          },
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: parsedAmount,
              },
              description: `${appName} donation`,
            },
          ],
        }),
      onApprove: async (_, actions) => {
        try {
          const details = await actions.order.capture();
          const capture = details?.purchase_units?.[0]?.payments?.captures?.[0] ?? {};
          await addDoc(collection(db, 'transactions'), {
            orderId: details.id,
            payerEmail: details?.payer?.email_address ?? '',
            payerName: `${details?.payer?.name?.given_name ?? ''} ${
              details?.payer?.name?.surname ?? ''
            }`.trim(),
            amount: parseFloat(capture.amount?.value ?? parsedAmount),
            currency: capture.amount?.currency_code ?? 'USD',
            status: capture.status ?? details.status ?? 'COMPLETED',
            createdAt: serverTimestamp(),
            source: 'paypal',
          });
          toast.success('Thank you for your donation!');
        } catch (err) {
          toast.error('Payment captured but failed to record transaction.');
          console.error(err);
        }
      },
      onError: () => {
        toast.error('Unable to process PayPal donation right now.');
      },
    });

    button.render(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parsedAmount, loading, error]);

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
            Donation amount (USD)
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
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

