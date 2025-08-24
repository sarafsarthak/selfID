import React from "react";
import { useState, useEffect } from "react";

const UserdashBoard = () => {

    const [user, setUser] = useState(null);
    
    const handleDownload = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first.");
          return
        }
      
        try {
          const response = await fetch("http://localhost:3000/download-credential", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to download credential");
          }
      
          // ✅ convert response to a downloadable file
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${user.name}.json`; 
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } catch (err) {
          console.error("Download error:", err);
          console.log(err)
          alert("Could not download credential. Please try again.");
        }
      };
      
      
    
    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("token"); // get JWT
  
        if (!token) {
          window.location.href = "/user-login"; 
          return;
        }
  
        try {
          const response = await fetch("http://localhost:3000/user-dashboard", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // send token
            },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setUser(data.user); // backend should return user object
          } else {
            alert("Unauthorized! Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/user-login";
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchUser();
    }, []);
  
    if (!user) return <h2>Loading user details...</h2>;
  
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
                <span className="text-emerald-400 font-semibold">Verified</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Joined: {user.joined}
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8">
              <button onClick={handleDownload}
               className="btn-primary px-8 py-3">Download Certificate</button>
            </div>
          </div>
  
          {/* User Details */}
          <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-2 label-dark">Full Name</div>
              <div className="font-medium text-slate-100">{user.name}</div>
            </div>
            <div>
              <div className="mb-2 label-dark">Email</div>
              <div className="font-medium text-slate-100">{user.email}</div>
            </div>
            <div>
              <div className="mb-2 label-dark">Date of Birth</div>
              <div className="font-medium text-slate-100">{user.dob}</div>
            </div>
            <div>
              <div className="mb-2 label-dark">Mobile Number</div>
              <div className="font-medium text-slate-100">{user.phone}</div>
            </div>
            <div>
              <div className="mb-2 label-dark">Aadhaar Number</div>
              <div className="font-medium text-slate-100">{user.aadhar || "Currently N/A"}</div>
            </div>
          </div>
  
          {/* Add additional sections here, e.g. verification history, actions, etc. */}
        </section>
      </div>

        
    );
  };

export default UserdashBoard;
