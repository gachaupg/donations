import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faPhone,
  faPaperPlane,
  faFileAlt,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import flapPanelImage from '../assets/Image_1.jpeg';

function ContactForm({ embedded = false }) {
  const [formValues, setFormValues] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setFormValues({
        name: '',
        subject: '',
        email: '',
        message: '',
      });
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
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-white">
        <div className="w-full max-w-md space-y-4 rounded-3xl border border-emerald-200/50 bg-emerald-50 p-8 text-center shadow-lg">
          <p className="text-lg font-semibold text-emerald-800">
            Thanks for sending your message!
          </p>
          <p className="text-sm text-emerald-700">
            Our team will review it shortly and get back to you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
            >
              Send another message
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const rootSurface = embedded ? 'py-6 text-slate-900 sm:py-8' : 'py-12 px-4 sm:px-6';
  const rootPad = embedded ? '' : 'px-4 sm:px-6';

  const brandTitleClass = embedded
    ? 'text-lg font-bold tracking-[0.2em] text-emerald-950 sm:text-xl'
    : 'text-xl font-bold tracking-[0.22em] text-white sm:text-2xl';
  const brandSubtitleClass = embedded
    ? 'mt-3 text-base font-semibold text-amber-600 sm:text-lg'
    : 'mt-4 text-base font-semibold text-amber-300 sm:text-lg';
  const brandTaglineClass = embedded
    ? 'mt-2 text-base font-medium text-slate-800 sm:text-lg'
    : 'mt-2 text-lg font-medium text-white sm:text-xl';

  const rowClass =
    'flex flex-col gap-1 border-b border-amber-900/10 py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4';
  const labelClass = 'text-sm font-semibold text-[#5c4033]';
  const valueClass = 'text-sm text-[#6b4e3d] sm:text-right';

  return (
    <div className={`${rootSurface} ${rootPad}`.trim()}>
      <div className="mx-auto w-full max-w-6xl">
        <header className={`text-center ${embedded ? 'mb-8' : 'mb-10 sm:mb-12'}`}>
          <p className={brandTitleClass}>REUBEN WAIRICU FOUNDATION</p>
          <p className={brandSubtitleClass}>Rooted in Community</p>
          <p className={brandTaglineClass}>Giving Hope, Sharing Love, Touching Hearts</p>
          <div
            className={`mx-auto mt-6 max-w-md border-t ${embedded ? 'border-slate-300' : 'border-white/25'}`}
            aria-hidden="true"
          />
        </header>

        <div className="grid w-full items-stretch gap-8 text-left sm:gap-10 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <aside className="flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg sm:min-h-[28rem] lg:min-h-[min(100%,32rem)]">
            <div className="relative min-h-0 flex-1 basis-0 border-b border-slate-200/80">
              <img
                src={flapPanelImage}
                alt="Reuben Wairicu Foundation volunteers and community outreach"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex min-h-0 flex-1 basis-0 flex-col bg-white px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <h2 className="text-xl font-semibold tracking-tight text-emerald-800 sm:text-2xl">
                Get Involved
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm font-medium leading-relaxed text-[#5c4033] sm:text-base">
                <li>Donate</li>
                <li>Volunteer</li>
                <li>Partner</li>
                <li>Advocate</li>
              </ul>
              {embedded ? (
                <Link
                  to="/contact#contact-form"
                  className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#134e2a] px-4 py-3.5 text-center text-base font-bold text-white shadow-md transition hover:bg-[#0f3d22]"
                >
                  Join Us Today
                </Link>
              ) : (
                <a
                  href="#contact-form"
                  className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#134e2a] px-4 py-3.5 text-center text-base font-bold text-white shadow-md transition hover:bg-[#0f3d22]"
                >
                  Join Us Today
                </a>
              )}
            </div>
          </aside>

          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 xl:gap-10">
          <aside className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-emerald-800 sm:text-[1.65rem]">
              Contact Us
            </h2>

            <div className="mt-6 space-y-0 text-left">
              <div className={rowClass}>
                <span className={labelClass}>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-emerald-700/90" />
                  Email
                </span>
                <a
                  href="mailto:reubenwairicufoundation@gmail.com"
                  className={`${valueClass} font-medium text-emerald-800 underline decoration-amber-600/40 underline-offset-2 hover:text-emerald-900`}
                >
                  reubenwairicufoundation@gmail.com
                </a>
              </div>
              <div className={rowClass}>
                <span className={labelClass}>
                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-emerald-700/90" />
                  Phone
                </span>
                <a
                  href="tel:+254723237149"
                  className={`${valueClass} font-medium text-emerald-800 underline decoration-amber-600/40 underline-offset-2 hover:text-emerald-900`}
                >
                  +254 723 237149
                </a>
              </div>
              <div className={rowClass}>
                <span className={labelClass}>
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-emerald-700/90" />
                  Location
                </span>
                <span className={`${valueClass} font-medium`}>Kenya</span>
              </div>
              <div className="border-b border-amber-900/10 py-3">
                <p className={`${labelClass} mb-3`}>Socials</p>
                <div className="flex flex-col gap-2 sm:items-end">
                  <a
                    href="https://www.facebook.com/reuben.wairicufoundation?_rdc=1&_rdr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#6b4e3d] underline decoration-amber-600/40 underline-offset-2 hover:text-emerald-900"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="text-blue-700" />
                    Facebook — Reuben Wairicu Foundation
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#6b4e3d] underline decoration-amber-600/40 underline-offset-2 hover:text-emerald-900"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-pink-600" />
                    Instagram — Reuben Wairicu Foundation
                  </a>
                </div>
              </div>
              <div className={`${rowClass} border-b-0`}>
                <span className={labelClass}>Contact person</span>
                <span className={`${valueClass} font-medium`}>Milcah Ochoki</span>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <p className="text-center text-sm font-medium italic text-[#5c4033]/85">
              Together, we can make a difference.
            </p>
            <p className="mt-4 text-center text-xs leading-relaxed text-[#6b4e3d]/75">
              <span className="font-semibold text-[#5c4033]">Office hours:</span> Monday – Friday, 9:00am –
              5:00pm EAT. We aim to respond within two working days.
            </p>
          </aside>

        <form
          id="contact-form"
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-emerald-600" />
              Full name
            </label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <label htmlFor="subject">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-emerald-600" />
              Subject
            </label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              id="subject"
              type="text"
              name="subject"
              placeholder="How can we help?"
              value={formValues.subject}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-emerald-600" />
              Email address
            </label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <label htmlFor="message">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2 text-emerald-600" />
              Message
            </label>
            <textarea
              className="min-h-[100px] rounded-lg border border-slate-200 px-3 py-2 text-slate-700 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              id="message"
              name="message"
              placeholder="Share a little more about how we can assist"
              value={formValues.message}
              onChange={handleChange}
            />
          </div>

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            type="submit"
            disabled={submitting}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            {submitting ? 'Submitting…' : 'Submit message'}
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
