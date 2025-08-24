import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Navbar component with dropdown


const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card p-5 transition-all hover:-translate-y-1 hover:border-primary-500/50 hover:bg-dark-700/60">
    <div className="mb-3 text-2xl">{icon}</div>
    <div className="mb-1 font-semibold text-slate-50">{title}</div>
    <div className="text-sm text-slate-400">{desc}</div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app bg-radial-glow pt-16">
      {/* Transparent Navbar with Dropdown */}
      

      {/* Main Hero Section */}
      <section className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: Content */}
          <div>
            <div className="glass-card p-8 animate-fade-in">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-primary-500 to-accent-500 text-3xl shadow-glow">
                🛡️
              </div>
              <h1 className="mb-4 text-5xl font-extrabold md:text-6xl bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
                Secure Identity Verification
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-lg text-slate-300">
                Fast, privacy-first verification for individuals and organizations. Compliant, scalable, and delightful to use.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="btn-transparent"
                  onClick={() => navigate("/register-user")}
                >
                  Register as user
                </button>
                <button
                  className="btn-transparent"
                  onClick={() => navigate("/register-verifier")}
                >
                  Register as Verifier
                </button>
              </div>
            </div>
            {/* Features */}
            <div id="features" className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              <FeatureCard icon="🔒" title="Secure" desc="Bank-grade encryption end-to-end." />
              <FeatureCard icon="🌍" title="Compliant" desc="GDPR, KYC & AML friendly." />
            </div>
          </div>
          {/* Right: Visual */}
          <div className="flex justify-center">
            <div className="relative h-[360px] w-[360px] animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-accent-500/20 blur-3xl" />
              <div className="relative grid h-full w-full place-items-center rounded-2.5xl border border-white/10 bg-[rgba(15,23,42,0.5)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="text-center">
                  <div className="mb-3 text-sm uppercase tracking-wider text-slate-400">Live Status</div>
                  <div className="text-4xl font-bold text-slate-100">99.99%</div>
                  <div className="mt-1 text-slate-400">Uptime</div>
                  <div className="mt-6 text-sm text-slate-400">Trusted by teams worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="about" className="sr-only">About section anchor</div>
      </section>
    </div>
  );
};

export default Home;
