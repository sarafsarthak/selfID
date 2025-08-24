import React, { useState,useEffect, useRef } from 'react'
import { useNavigate, Link  } from 'react-router';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();
  
    // close if clicked outside dropdown
    useEffect(() => {
      function handleClick(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
  
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary-500/20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-primary-500 to-accent-500 text-white text-lg">🛡️</span>
            <span className="text-lg font-bold text-white">VerifyMe</span>
          </Link>
          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <Link className="nav-link" to="/">Home</Link>
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#about">About</a>
  
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
                      navigate("/user-login");
                    }}
                  >
                    As User
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-slate-100 hover:bg-accent-500/10 hover:text-accent-500 font-medium"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/verifier-login");
                    }}
                  >
                    As Verifier
                  </button>
                 
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }

  

export default Navbar
