import React, { useMemo,useEffect, useRef, useState } from "react";

// ===== Helpers (unchanged functionality) =====
function stableStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort(), 2);
}
const enc = new TextEncoder();
function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
function canonicalBytes(dataObject) {
  const canonical = stableStringify(dataObject);
  return enc.encode(canonical);
}
function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----\w+ PUBLIC KEY-----/g, "").replace(/\s+/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// ===== UI helpers =====
const Detail = ({ label, value }) => (
  <div>
    <div className="label-dark mb-1">{label}</div>
    <div className="font-medium text-slate-100 break-words">{value ?? "-"}</div>
  </div>
);

const Chip = ({ label, value }) => (
  <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[rgba(2,6,23,0.5)] px-3 py-1 text-sm text-slate-300">
    <span className="text-slate-400">{label}:</span>
    <span className="text-slate-100">{value}</span>
  </div>
);

const Badge = ({ ok }) => (
  <span
    className={
      ok
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded"
        : "bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded"
    }
  >
    {ok ? "Authentic" : "Failed"}
  </span>
);

// ===== Main component (same logic, upgraded UI) =====
const VerifierDashboard = () => {
  const [payload, setPayload] = useState(null);
  const [fileName, setFileName] = useState("");
  const [parseError, setParseError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef();
  const [verifier, setVerifier] = useState(null)

  // Derive a compact preview based on your current shape (payload.credential)
  const preview = useMemo(() => {
    if (!payload) return null;
    const base = payload?.credential;
    return {
      signed: Boolean(payload?.credential && payload?.signature && payload?.publicKey),
      fields: {
        name: base?.name,
        email: base?.email,
        dob: base?.dob,
        gender: base?.gender,
        occupation: base?.occupation,
        phone: base?.phone,
      },
      algo: payload?.algo || payload?.publicKey?.alg || "-",
      kty: payload?.publicKey?.kty || "-",
      keyId: payload?.keyId || "-",
      issuedAt: payload?.issuedAt || "-",
      hasPublicKey: Boolean(payload?.publicKey),
    };
  }, [payload]);

   useEffect(() => {
        const fetchVerifier = async () => {
          const token = localStorage.getItem("token"); // get JWT
    
          if (!token) {
            window.location.href = "/verifier-login"; 
            return;
          }
    
          try {
            const response = await fetch("http://localhost:3000/verifier-dashboard", {
              method: "GET",
              credentials: "include"
            })

            .then(res => res.json())
            .then(data => console.log(data))
    
            const data = await response.json();
    
            if (response.ok) {
              setVerifier(data.verifier); // backend should return user object
            } else {
              alert("Unauthorized! Please login again.");
              res.clearCookie("token")
              window.location.href = "/verifier-login";
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchVerifier();
      }, []);

  // Keep verification logic exactly as you have it (backend call)
  const verifySignature = async () => {
    if (!payload) {
      setResult({ ok: false, reason: "No payload uploaded" });
      return;
    }
    try {
      setVerifying(true);
      setResult(null);

      const response = await fetch("http://localhost:3000/verify-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        setResult({ ok: true });
        setPayload(payload);
      } else {
        setResult({ ok: false, reason: data.reason || "Invalid signature" });
      }
    } catch (err) {
      setResult({ ok: false, reason: err.message || "Verification error" });
    } finally {
      setVerifying(false);
    }
  };

  // Keep file reading logic the same
  const onSelectFile = async (e) => {
    setParseError("");
    setResult(null);
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (file.type && !file.type.includes("json")) {
      setParseError("Please select a JSON file.");
      setPayload(null);
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      setPayload(json);
    } catch (err) {
      setParseError("Invalid JSON file.");
      setPayload(null);
    }
  };

  // Keep clear/reset logic the same
  const onClear = () => {
    setPayload(null);
    setFileName("");
    setParseError("");
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };


  return (
    <div className="min-h-screen bg-app bg-radial-glow pt-20 px-4">
      <section className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="glass-card p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
              Verifier Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Upload a user’s credential JSON and verify its signature.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="cred-file" className="btn-transparent cursor-pointer px-5 py-3">
              Upload JSON
            </label>
            <input
              id="cred-file"
              ref={inputRef}
              type="file"
              accept="application/json,.json"
              onChange={onSelectFile}
              className="hidden"
            />
            {payload && (
              <button className="btn-transparent" type="button" onClick={onClear}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Status + Meta (no raw JSON) */}
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-slate-300">
              {fileName ? (
                <>
                  Selected: <span className="text-slate-100">{fileName}</span>
                </>
              ) : (
                <span>No file selected</span>
              )}
            </div>
            {payload && (
              <div className="flex flex-wrap items-center gap-2">
                <Chip label="Signed" value={preview?.signed ? "Yes" : "No"} />
                <Chip label="Public Key" value={preview?.hasPublicKey ? "Present" : "Missing"} />
                <Chip label="Algorithm" value={preview?.algo} />
                <Chip label="Key Type" value={preview?.kty} />
                {preview?.keyId && <Chip label="Key ID" value={preview.keyId} />}
                {preview?.issuedAt && <Chip label="Issued" value={preview.issuedAt} />}
              </div>
            )}
          </div>
          {parseError && <div className="mt-3 text-red-400">{parseError}</div>}
        </div>

        {/* Main grid: Summary on left, Result on right */}
        {payload ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Identity Summary */}
            <div className="glass-card p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Identity Summary</h2>
              <div className="grid grid-cols-1 gap-4">
                <Detail label="Full Name" value={preview?.fields?.name} />
                <Detail label="Email" value={preview?.fields?.email} />
                <Detail label="DOB" value={preview?.fields?.dob} />
                <Detail label="Gender" value={preview?.fields?.gender} />
                <Detail label="Occupation" value={preview?.fields?.occupation} />
                <Detail label="Phone" value={preview?.fields?.phone} />
              </div>
              <button
                className="btn-primary w-full mt-6"
                onClick={verifySignature}
                disabled={verifying}
                type="button"
              >
                {verifying ? "Verifying..." : "Verify Signature"}
              </button>
              <p className="mt-3 text-xs text-slate-400">
                The signature is verified against the uploaded credential using the provided public key.
              </p>
            </div>

            {/* Verification Result (prominent, not under the button) */}
            <div className="glass-card p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Verification Result</h2>
                <div>
                  {result ? <Badge ok={result.ok} /> : <span className="text-slate-400 text-sm">Awaiting verification</span>}
                </div>
              </div>

              {/* Status panel */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
                  <div className="text-slate-400 mb-1">Current Status</div>
                  <div className="text-slate-100 font-semibold">
                    {result ? (result.ok ? "Authentic" : "Failed") : "Not verified"}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4">
                  <div className="text-slate-400 mb-1">Signature Integrity</div>
                  <div className="text-slate-100 font-semibold">
                    {result ? (result.ok ? "Valid" : "Invalid") : "Unknown"}
                  </div>
                </div>
              </div>

              {/* Reason / Guidance */}
              <div className="mt-4">
                {result && result.reason ? (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                    <div className="font-semibold mb-1">Reason</div>
                    <div>{result.reason}</div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-[rgba(2,6,23,0.5)] p-4 text-slate-300">
                    <div className="font-semibold mb-1 text-slate-200">How it works</div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The credential’s signature is validated using its corresponding public key.</li>
                      <li>Only high‑level details are shown; raw data remains hidden for privacy.</li>
                      <li>Use “Clear” to select a different file and verify again.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="glass-card p-10 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 text-white text-xl shadow-glow">
              ⬆️
            </div>
            <h3 className="text-xl font-semibold text-slate-100">
              Upload a credential JSON to begin
            </h3>
            <p className="mt-2 text-slate-400">
              Select a signed credential file exported by the user to verify its authenticity.
            </p>
            <div className="mt-6">
              <label htmlFor="cred-file" className="btn-primary cursor-pointer">
                Choose File
              </label>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default VerifierDashboard;
