import React, { useCallback, useMemo, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import PayPalDonate from '../components/PayPalDonate.jsx';

const Donate = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] py-8 px-4 text-white sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-full">
            <PayPalDonate />
          </div>
          <DirectTransferSpotlight />
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">How to give</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">3 easy steps to support</h3>
          <ol className="mt-4 space-y-4 text-sm text-slate-600">
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                1
              </span>
              <div>
                <p className="font-semibold text-slate-900">Choose your channel</p>
                <p>Pick PayPal for a quick card payment or bank transfer for a fee-free gift.</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                2
              </span>
              <div>
                <p className="font-semibold text-slate-900">Send your contribution</p>
                <p>Complete your PayPal checkout or confirm the bank details before approving the transfer.</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                3
              </span>
              <div>
                <p className="font-semibold text-slate-900">Share your receipt</p>
                <p>
                  Email proof of payment to{' '}
                  <span className="font-semibold text-emerald-700">reubenwairicufoundation@gmail.com</span> so we
                  can thank you promptly.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <footer className="text-center text-xs text-white/70">
          Thank you for partnering with the Reuben Wairicu Foundation. Together we restore dignity,
          unlock opportunity, and ensure no neighbour is left behind.
        </footer>
      </div>
    </div>
  );
};

export default Donate;

const DirectTransferSpotlight = () => {
  const [copiedKey, setCopiedKey] = useState('');

  const transferSections = useMemo(
    () => [
      {
        id: 'australia',
        label: 'Australia Support',
        headline: 'Direct bank deposit (AUD)',
        description:
          'Make a local AUD transfer using the account below so gifts route straight to priority work.',
        fields: [
          { key: 'accountName', label: 'Account name', value: 'Jane Nalianya' },
          { key: 'bsb', label: 'BSB', value: '083495' },
          { key: 'account', label: 'Account', value: '161373692' },
        ],
      },
      {
        id: 'kenya',
        label: 'Kenya Support',
        headline: 'Reuben Wairicu Foundation — Equity Bank, Kitale',
        description: 'For Financial Support. Thanking you in advance.',
        fields: [
          { key: 'accountNameKe', label: 'Account name', value: 'Reuben Wairicu Foundation' },
          { key: 'accountKe', label: 'Account number', value: '0330284842169' },
          { key: 'bankKe', label: 'Bank', value: 'Equity Bank, Kitale' },
          { key: 'mpesaKe', label: 'Mpesa line', value: '+254 723 237149 (Milcah Ochoki)' },
        ],
      },
    ],
    []
  );

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

  return (
    <section className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 sm:p-7">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-600">
          Manual payments
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-[2.1rem]">Direct bank deposit</h2>
        <p className="text-sm text-slate-600">
          Use the verified details below for a fee-free transfer. Funds land quickly and move right to urgent
          programs.
        </p>
      </div>

      <div className="mt-6 grid w-full gap-5 md:grid-cols-2">
        {transferSections.map((section) => (
          <div key={section.id} className="w-full space-y-4">
            <div className="space-y-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-600">{section.label}</p>
                <p className="text-base font-semibold text-slate-900">{section.headline}</p>
              </div>
              {section.description && <p className="text-sm text-slate-600">{section.description}</p>}
            </div>
            <dl className="w-full divide-y divide-slate-200 text-sm text-slate-600">
              {section.fields.map((field) => {
                const fieldKey = `${section.id}-${field.key}`;
                return (
                  <div
                    key={field.key}
                    className="flex w-full flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div className="flex-1">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                        {field.label}
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-slate-900">{field.value}</dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(field.value, fieldKey)}
                      className="inline-flex items-center gap-2 self-end rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:self-auto"
                    >
                      <FiCopy className="text-sm" />
                      {copiedKey === fieldKey ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <p>Use the verified account details above to send a secure manual transfer to the foundation.</p>
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          After sending a transfer, please email your confirmation to{' '}
          <a
            href="mailto:reubenwairicufoundation@gmail.com"
            className="font-semibold text-emerald-700 underline decoration-dotted underline-offset-4"
          >
            reubenwairicufoundation@gmail.com
          </a>{' '}
          so we can acknowledge your gift promptly.
        </p>
      </div>
    </section>
  );
};
