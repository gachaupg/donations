import React, { useState, useEffect } from "react";
import { BsSun, BsMoon, BsList } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useBranding } from "../context/BrandingContext.jsx";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { branding } = useBranding();

  const logoUrl =
    branding?.logoUrl ||
    "https://res.cloudinary.com/pitz/image/upload/v1739433241/Screenshot_2025-02-13_104904__1_-removebg-preview_hbjaqg.png";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`navbar ${theme === "dark" ? "navbar--dark" : "navbar--light"} ${
        isScrolled ? "navbar--scrolled" : ""
      }`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Reuben Wairicu Foundation">
          <img
            src={logoUrl}
            alt="Reuben Wairicu Foundation logo"
          />
          <div className="navbar__brand-text">
            <span className="navbar__brand-eyebrow">Reuben Wairicu</span>
            <span className="navbar__brand-title">Foundation</span>
          </div>
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
            Donate
          </Link>
          <Link
            to={user ? "/dashboard" : "/login"}
            className={`btn ${user ? "dashboard-btn" : "login-btn"}`}
          >
            {user ? "Dashboard" : "Login"}
          </Link>
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <BsSun /> : <BsMoon />}
          </button>
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
                Donate
              </Link>
              <Link
                to={user ? "/dashboard" : "/login"}
                className={`btn ${user ? "dashboard-btn" : "login-btn"}`}
                onClick={closeMenu}
              >
                {user ? "Dashboard" : "Login"}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
