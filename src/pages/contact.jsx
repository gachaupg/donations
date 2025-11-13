import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faPhone,
  faPaperPlane,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

function ContactForm() {
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
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-white px-4 text-slate-900">
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

  return (
    <div className="bg-white py-12 px-4 text-slate-900 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Contact us
            </span>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              We are here to help you keep hope alive
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Reach out with questions, ideas, or partnership opportunities. We’d love to hear from
              you and explore how we can serve together.
            </p>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-900">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-emerald-600" />
                Email
              </span>
              <a
                href="mailto:reubenwairicufoundation@gmail.com"
                className="text-emerald-700 underline underline-offset-2"
              >
                reubenwairicufoundation@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-900">
                <FontAwesomeIcon icon={faFacebook} className="mr-2 text-blue-600" />
                Facebook
              </span>
              <a
                href="https://www.facebook.com/profile.php?id=61554326003956&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline underline-offset-2"
              >
                Reuben Wairicu Foundation
              </a>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-900">
                <FontAwesomeIcon icon={faInstagram} className="mr-2 text-pink-500" />
                Instagram
              </span>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline underline-offset-2"
              >
                Reuben Wairicu Foundation
              </a>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-900">Contact person</span>
              <span className="text-slate-600">Milcah Ochoki</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-slate-900">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-emerald-600" />
                Phone
              </span>
              <a href="tel:+254723237149" className="text-emerald-700 underline underline-offset-2">
                +254 723 237149
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-sm leading-relaxed text-emerald-700">
            <p>
              <strong className="font-semibold text-emerald-800">Office hours:</strong> Monday – Friday,
              9:00am – 5:00pm EAT. We aim to respond to all inquiries within two working days.
            </p>
          </div>
        </div>

        <form
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
  );
}

export default ContactForm;
