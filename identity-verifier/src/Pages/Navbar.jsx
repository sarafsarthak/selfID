import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);
  const navigate = useNavigate();

  // close dropdown if clicked outside
  useEffect(() => {
    function handleClick(e) {
      // close login dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      // close mobile menu
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // close mobile menu on navigation
  const handleNav = (to) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary-500/20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-primary-500 to-accent-500 text-white text-lg">🛡️</span>
          <span className="text-lg font-bold text-white">selfID</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/features">Features</Link>
          <Link className="nav-link" to="/about">About</Link>

          {/* Dropdown Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="btn-transparent flex items-center gap-2 px-4 py-2"
              onClick={() => setDropdownOpen((b) => !b)}
            >
              <span className="text-white font-medium">Login</span>
              <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-500">
                <path d="M4 7l5 5 5-5" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 rounded-xl glass-card py-2 w-40 shadow-lg animate-fade-in">
                <button
                  className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-primary-500/10 hover:text-primary-500 font-medium"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/user-login');
                  }}
                >
                  As User
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-accent-500/10 hover:text-accent-500 font-medium"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/verifier-login');
                  }}
                >
                  As Verifier
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((b) => !b)}
        >
          {/* Icon toggles */}
          <svg
            className={`h-6 w-6 ${mobileOpen ? 'hidden' : 'block'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            className={`h-6 w-6 ${mobileOpen ? 'block' : 'hidden'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        ref={mobileRef}
        className={`md:hidden origin-top overflow-hidden transition-all duration-200 ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="nav-link px-2 py-2 rounded-lg hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="nav-link px-2 py-2 rounded-lg hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/about"
              className="nav-link px-2 py-2 rounded-lg hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            {/* Mobile Login collapsible */}
            <div className="mt-2">
              <button
                className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5"
                onClick={() => setDropdownOpen((b) => !b)}
                aria-expanded={dropdownOpen}
                aria-controls="mobile-login-menu"
              >
                <span className="text-white font-medium">Login</span>
                <svg
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-accent-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M4 7l5 5 5-5" />
                </svg>
              </button>
              <div
                id="mobile-login-menu"
                className={`overflow-hidden transition-all duration-200 ${
                  dropdownOpen ? 'max-h-40 mt-1' : 'max-h-0'
                }`}
              >
                <div className="glass-card rounded-xl">
                  <button
                    className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-primary-500/10 hover:text-primary-500 font-medium"
                    onClick={() => handleNav('/user-login')}
                  >
                    As User
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-accent-500/10 hover:text-accent-500 font-medium"
                    onClick={() => handleNav('/verifier-login')}
                  >
                    As Verifier
                  </button>
                </div>
              </div>
            </div>
            {/* End Mobile Login */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
