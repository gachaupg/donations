import React, { useEffect, useMemo, useState } from "react";
import { BsList, BsHeartFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useBranding } from "../context/BrandingContext.jsx";
import defaultLogo from "../assets/rwf-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "News & Events", path: "/news" },
  { label: "Sponsorship", path: "/sponsorship" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { branding } = useBranding();

  const resolvedBrandLogo = useMemo(() => {
    const candidate = typeof branding?.logoUrl === "string" ? branding.logoUrl.trim() : "";
    return candidate.length > 0 ? candidate : defaultLogo;
  }, [branding?.logoUrl]);

  const [logoSrc, setLogoSrc] = useState(resolvedBrandLogo);

  useEffect(() => {
    setLogoSrc(resolvedBrandLogo);
  }, [resolvedBrandLogo]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`navbar navbar--dark ${isScrolled ? "navbar--scrolled" : ""}`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Reuben Wairicu Foundation">
          <img
            src={logoSrc}
            alt="Reuben Wairicu Foundation logo"
            onError={() => setLogoSrc(defaultLogo)}
          />
         
        </Link>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/donate" className="btn donate-btn">
            <BsHeartFill className="donate-btn__icon" aria-hidden="true" />
            <span>Donate</span>
          </Link>
          <button
            type="button"
            className="icon-button navbar__menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <BsList size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-nav"
            className="navbar__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/"
              className="navbar__mobile-brand"
              aria-label="Reuben Wairicu Foundation"
              onClick={closeMenu}
            >
              <img
                src={logoSrc}
                alt="Reuben Wairicu Foundation logo"
                onError={() => setLogoSrc(defaultLogo)}
              />
            </Link>
            <div className="navbar__mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__mobile-link ${
                    location.pathname === link.path ? "is-active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="navbar__mobile-cta">
              <Link to="/donate" className="btn donate-btn" onClick={closeMenu}>
                <BsHeartFill className="donate-btn__icon" aria-hidden="true" />
                <span>Donate</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
