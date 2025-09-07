import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureItem = ({ icon, title, desc }) => (
  <div className="glass-card p-6">
    <div className="text-2xl mb-3">{icon}</div>
    <h3 className="text-slate-100 font-semibold">{title}</h3>
    <p className="text-slate-300 mt-2 text-sm">{desc}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
    <div className="text-slate-400 text-sm">{label}</div>
    <div className="text-slate-100 font-semibold text-xl">{value}</div>
  </div>
);

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app bg-radial-glow pt-20 px-4">
      <section className="mx-auto max-w-6xl space-y-10">
        {/* Hero */}
        <div className="glass-card p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
            More of selfID
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl">
            SelfID brings a minimal, privacy‑first approach to digital identity:
            own data, share selectively, and verify instantly with cryptographic proofs.
          </p>
          
        </div>

        {/* Core features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureItem
            icon="🗝️"
            title="User‑Owned Identity"
            desc="Share only what’s necessary and revoke access anytime. Control stays with the individual."
          />
          <FeatureItem
            icon="✅"
            title="Verifiable Credentials"
            desc="Export signed JSON credentials that verifiers can independently validate."
          />
          <FeatureItem
            icon="🛡️"
            title="Tamper‑Evident"
            desc="Digital signatures detect any modification, ensuring integrity and trust."
          />
        </div>

        {/* Essentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureItem
            icon="🌗"
            title="Selective Disclosure"
            desc="Prove facts (like age or membership) without revealing extra personal data."
          />
          <FeatureItem
            icon="🔗"
            title="Interoperable by Design"
            desc="Built to work across apps and verifiers using modern identity standards."
          />
          <FeatureItem
            icon="⚡"
            title="Simple & Fast"
            desc="Clean flows for users and verifiers with instant verification outcomes."
          />
        </div>

        {/* Snapshot */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-4">At a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Uptime" value="99.99%" />
            <Stat label="Avg Verify" value="~450 ms" />
            <Stat label="Requests / day" value="120k+" />
            <Stat label="Privacy" value="Selective" />
          </div>
        </div>

        {/* How it works (minimal) */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Step 1</div>
              <div className="text-slate-100 font-semibold mt-1">Create</div>
              <p className="text-slate-300 mt-2 text-sm">
                Register and set up your private profile.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Step 2</div>
              <div className="text-slate-100 font-semibold mt-1">Receive</div>
              <p className="text-slate-300 mt-2 text-sm">
                Get signed credentials for your attributes.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Step 3</div>
              <div className="text-slate-100 font-semibold mt-1">Share</div>
              <p className="text-slate-300 mt-2 text-sm">
                Export and share only the credential needed.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
              <div className="text-slate-400 text-sm">Step 4</div>
              <div className="text-slate-100 font-semibold mt-1">Verify</div>
              <p className="text-slate-300 mt-2 text-sm">
                Verifiers upload JSON and get instant results.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-6 text-center">
          <h3 className="text-xl font-semibold text-slate-100">Start with selfID</h3>
          <p className="text-slate-300 mt-2">
            Create a profile, export credentials, and verify with confidence.
          </p>
        
        </div>
      </section>
    </div>
  );
};

export default Features;
