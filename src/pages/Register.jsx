import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!displayName.trim()) {
      setError('Please provide a full name.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (displayName.trim()) {
        await updateProfile(userCredential.user, { displayName: displayName.trim() });
      }
      navigate('/dashboard', { replace: true });
    } catch (createError) {
      if (createError.code === 'auth/email-already-in-use') {
        setError('An account with that email already exists. Try logging in instead.');
      } else if (createError.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (createError.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Unable to create account right now. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-emerald-100/60">
        <div className="px-6 py-10 sm:px-10 sm:py-12">
          <div className="text-center space-y-3 mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              Foundation Admin
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
              Create Your Admin Account
            </h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Register to manage programs, donations, and volunteer outreach for the Reuben Wairicu
              Foundation.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Jane Wairicu"
                className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@rwfoundation.org"
                className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:pointer-events-none disabled:opacity-70"
            >
              {submitting ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Already have access?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


