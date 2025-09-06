import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app bg-radial-glow pt-20 px-4">
      <section className="mx-auto max-w-5xl space-y-8">
        {/* Hero */}
        <div className="glass-card p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
            About selfID
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            SelfID is a privacy‑first identity platform that lets individuals control their data and verifiers confirm authenticity with cryptographic proofs—fast, simple, and secure.
          </p>
        </div>

        {/* Three concise pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-slate-100 font-semibold">User‑Owned</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Share only what’s necessary, with the option to revoke access anytime.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-slate-100 font-semibold">Verifiable</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Signed credentials make tampering detectable and verification instant.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-slate-100 font-semibold">Portable</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Reuse credentials across services—no repetitive onboarding.
            </p>
          </div>
        </div>

        {/* What / Why / How (minimal copy) */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-slate-400 text-sm">What</div>
              <h2 className="text-slate-100 font-semibold mt-1">Trusted Identity</h2>
              <p className="text-slate-300 mt-2 text-sm">
                Issue, hold, and present signed credentials that anyone can verify.
              </p>
            </div>
            <div>
              <div className="text-slate-400 text-sm">Why</div>
              <h2 className="text-slate-100 font-semibold mt-1">Privacy & Simplicity</h2>
              <p className="text-slate-300 mt-2 text-sm">
                Reduce data exposure and speed up checks with a streamlined flow.
              </p>
            </div>
            <div>
              <div className="text-slate-400 text-sm">How</div>
              <h2 className="text-slate-100 font-semibold mt-1">Signed JSON</h2>
              <p className="text-slate-300 mt-2 text-sm">
                Users export a signed JSON; verifiers upload and get clear results.
              </p>
            </div>
          </div>
        </div>

        {/* Compact values strip */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Security</div>
              <div className="text-slate-100 font-medium">Modern cryptography</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Usability</div>
              <div className="text-slate-100 font-medium">Clear, minimal UI</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Interoperable</div>
              <div className="text-slate-100 font-medium">Works across services</div>
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <div className="glass-card p-6 text-center">
          <h3 className="text-xl font-semibold text-slate-100">Start with SelfID</h3>
          <p className="text-slate-300 mt-2">
            Take control of identity—share less, verify more.
          </p>
         
        </div>
      </section>
    </div>
  );
};

export default About;
