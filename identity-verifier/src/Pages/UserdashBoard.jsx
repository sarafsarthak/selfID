import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserdashBoard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user info from backend
  useEffect(() => {
    let canceled = false;

    const run = async () => {

     
       

      try {
        const response = await fetch("http://localhost:3000/user-dashboard", {
          method: "GET",
          credentials: 'include'
         
        })

        if (!response.ok) {
          // Try to read server message
          let message = "Unauthorized! Please login again.";
          try {
            const err = await response.json();
            if (err?.message) message = err.message;
          } catch {}
          localStorage.removeItem("token");
          if (!canceled) {
            alert(message);
            navigate("/user-login", { replace: true });
          }
          return;
        }

        const data = await response.json();
        if (!canceled) {
          setUser(data?.user || null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        if (!canceled) {
          alert("Error fetching user. Please try again.");
          navigate("/user-login", { replace: true });
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    run();
    return () => {
      canceled = true;
    };
  }, [navigate]);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    if (!user || !token) return;

    try {
      const response = await fetch("http://localhost:3000/download-credential", {
        method: "GET",
        credentials: "include"

      })

      if (!response.ok) {
        let msg = "Failed to download credential";
        try {
          const err = await response.json();
          if (err?.message) msg = err.message;
        } catch {}
        throw new Error(msg);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName =
        (user?.name || "credential").toString().replace(/\s+/g, "_");
      a.download = `${safeName}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert(err.message || "Could not download credential. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app bg-radial-glow pt-20 px-4 grid place-items-center">
        <div className="glass-card p-6 text-slate-200">Loading user details...</div>
      </div>
    );
  }

  if (!user) return null;

  const status = user?.status || "Verified";

  return (
    <div className="min-h-screen bg-app bg-radial-glow pt-20 px-4">
      <section className="max-w-5xl mx-auto">
        {/* Welcome Profile Card */}
        <div className="glass-card p-8 flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
              Welcome, {user.name}!
            </h1>
            <p className="mt-2 text-slate-300">
              Your identity status:{" "}
              <span
                className={
                  status === "Verified"
                    ? "text-emerald-400 font-semibold"
                    : status === "Pending"
                    ? "text-amber-400 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {status}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Joined: {user.joined || "—"}
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-8">
            <button onClick={handleDownload} className="btn-primary px-8 py-3">
              Download Credential
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="mb-2 label-dark">Full Name</div>
            <div className="font-medium text-slate-100">{user.name || "—"}</div>
          </div>
          <div>
            <div className="mb-2 label-dark">Email</div>
            <div className="font-medium text-slate-100">{user.email || "—"}</div>
          </div>
          <div>
            <div className="mb-2 label-dark">Date of Birth</div>
            <div className="font-medium text-slate-100">{user.dob || "—"}</div>
          </div>
          <div>
            <div className="mb-2 label-dark">Mobile Number</div>
            <div className="font-medium text-slate-100">{user.phone || "—"}</div>
          </div>
          <div>
            <div className="mb-2 label-dark">Aadhaar Number</div>
            <div className="font-medium text-slate-100">
              {user.aadhar || "Currently N/A"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserdashBoard;
