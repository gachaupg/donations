import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  FiCheckCircle,
  FiClock,
  FiFacebook,
  FiFileText,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiUser,
} from 'react-icons/fi';
import { db } from '../../firebase';
import teamImage from '../assets/Image_1.jpeg';

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'reubenwairicufoundation@gmail.com',
    href: 'mailto:reubenwairicufoundation@gmail.com',
    Icon: FiMail,
  },
  { label: 'Phone', value: '+254 723 237149', href: 'tel:+254723237149', Icon: FiPhone },
  { label: 'Contact person', value: 'Milcah Ochoki', Icon: FiUser },
  { label: 'Location', value: 'Kitale, Kenya', Icon: FiMapPin },
];

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/reuben.wairicufoundation?_rdc=1&_rdr#',
    Icon: FiFacebook,
  },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: FiInstagram },
];

const GET_INVOLVED = [
  { label: 'Donate', to: '/donate' },
  { label: 'Volunteer', href: '#contact-form' },
  { label: 'Partner', to: '/sponsorship' },
  { label: 'Advocate', href: '#contact-form' },
];

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder-white/40 transition focus:border-amber-300/70 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-amber-300/20';
const labelClass = 'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70';
const glassCard = 'rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur';
const pillClass =
  'inline-flex items-center rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:border-amber-300/60 hover:text-amber-100';

const EMPTY_FORM = { name: '', subject: '', email: '', message: '' };

function Contact() {
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValues.name || !formValues.subject || !formValues.email || !formValues.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, 'messages'), {
        ...formValues,
        createdAt: serverTimestamp(),
      });
      setFormValues(EMPTY_FORM);
      setSubmitted(true);
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Unable to send the message right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 text-white">
        <div className={`${glassCard} w-full max-w-md space-y-4 p-8 text-center`}>
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-xl text-emerald-950">
            <FiCheckCircle aria-hidden="true" />
          </span>
          <p className="text-lg font-semibold">Thanks for sending your message!</p>
          <p className="text-sm text-white/75">Our team will review it shortly and get back to you.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <button type="button" onClick={() => setSubmitted(false)} className="btn btn--outline !px-5 !py-2.5 !text-sm">
              Send another message
            </button>
            <Link to="/" className="btn btn--gold !px-5 !py-2.5 !text-sm">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 text-white sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <header className="space-y-2 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-100">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            Get in touch
          </span>
          <h1 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1]">
            We&apos;d love to <span className="rwf-gold-text">hear from you</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
            Questions, partnerships, volunteering, or support — reach out and our team will respond within two
            working days.
          </p>
        </header>

        <div className="grid items-start gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20">
              <img
                src={teamImage}
                alt="Reuben Wairicu Foundation volunteers at a community outreach"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
                <p className="text-sm font-semibold text-white">Get involved</p>
                <div className="flex flex-wrap gap-2">
                  {GET_INVOLVED.map((item) =>
                    item.to ? (
                      <Link key={item.label} to={item.to} className={pillClass}>
                        {item.label}
                      </Link>
                    ) : (
                      <a key={item.label} href={item.href} className={pillClass}>
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className={`${glassCard} p-4`}>
              <ul className="space-y-2.5">
                {CONTACT_DETAILS.map(({ label, value, href, Icon }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-300/10 text-amber-200">
                      <Icon aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p>
                      {href ? (
                        <a href={href} className="block break-words text-sm font-medium text-white transition hover:text-amber-200">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="my-3 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" aria-hidden="true" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Reuben Wairicu Foundation on ${label}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white transition hover:border-amber-300/60 hover:text-amber-200"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="flex items-center gap-1.5 text-xs text-white/65">
                  <FiClock className="text-amber-200" aria-hidden="true" />
                  Mon – Fri, 9:00am – 5:00pm EAT
                </p>
              </div>
            </div>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className={`${glassCard} scroll-mt-28 space-y-3 p-4 sm:p-5`}>
            <div>
              <h2 className="text-lg font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-white/65">All fields are required.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="name" className={labelClass}>
                  <FiUser className="text-amber-200" aria-hidden="true" />
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formValues.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className={labelClass}>
                  <FiMail className="text-amber-200" aria-hidden="true" />
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formValues.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="subject" className={labelClass}>
                <FiFileText className="text-amber-200" aria-hidden="true" />
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                value={formValues.subject}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className={labelClass}>
                <FiMessageSquare className="text-amber-200" aria-hidden="true" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Share a little more about how we can assist"
                value={formValues.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn--gold w-full gap-2 !py-3 !text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend aria-hidden="true" />
              {submitting ? 'Sending…' : 'Send message'}
            </button>

            <p className="text-center text-xs italic text-white/55">Together, we can make a difference.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
