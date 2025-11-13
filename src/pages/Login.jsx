import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../context/AuthContext.jsx';
import './Login.css';

const DEFAULT_ADMIN = {
  email: 'admin@rwfoundation.org',
  password: 'Hope@2025!',
};

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState(DEFAULT_ADMIN.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const ensureAdminUser = async (credentialsEmail, credentialsPassword) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        credentialsEmail,
        credentialsPassword
      );
      return createdUser;
    } catch (createError) {
      if (createError.code === 'auth/email-already-in-use') {
        // Attempt to sign-in again to ensure we handle race conditions.
        return signInWithEmailAndPassword(auth, credentialsEmail, credentialsPassword);
      }
      throw createError;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const credentialsEmail = email.trim();
    const credentialsPassword = password.trim() || DEFAULT_ADMIN.password;

    try {
      await signInWithEmailAndPassword(auth, credentialsEmail, credentialsPassword);
      navigate('/dashboard', { replace: true });
    } catch (signInError) {
      if (signInError.code === 'auth/user-not-found') {
        try {
          await ensureAdminUser(credentialsEmail, credentialsPassword);
          navigate('/dashboard', { replace: true });
        } catch (createError) {
          setError('Unable to create admin user. Please try again later.');
        }
      } else if (signInError.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (signInError.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setPassword('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span className="login-badge">Admin Access</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              type="email"
              value={email}
              className="login-input"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="admin@rwfoundation.org"
            />
          </label>

          <label className="login-label">
            Password
            <div className="login-password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                className="login-input"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder={DEFAULT_ADMIN.password}
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn btn--primary login-submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="login-hint">
          <strong>Tip:</strong> Leave the password field blank to use the default admin password.
        </div>
        <div className="login-switch">
          Don&apos;t have an account yet?{' '}
          <Link to="/register" className="login-switch__link">
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

