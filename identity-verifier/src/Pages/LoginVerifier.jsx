
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginVerifier = () => {
  const [form, setForm] = useState({
    companyEmail: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/verifier-login" ,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    })

    const data = await response.json()
    if(response.ok){

        navigate('/verifier-dashboard')
    } else{
        setError("Invalid email or password")
        setSuccess("")
    }

   
  

   
   
  }

  return (
    <div className="min-h-screen bg-app bg-radial-glow flex items-center justify-center pt-16">
      <section className="max-w-md w-full glass-card p-8 animate-fade-in">
        <h2 className="mb-2 text-center text-3xl font-bold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
          Verifier Login
        </h2>
        <p className="mb-6 text-center text-slate-400">
          Log in using your company email and password.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label-dark">Company Email</label>
            <input
              name="companyEmail"
              type="email"
              required
              placeholder="company@email.com"
              className="input-dark"
              value={form.companyEmail}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label-dark">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="input-dark"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="text-sm text-red-400 text-center">{error}</div>}
          {success && <div className="text-sm text-emerald-400 text-center">{success}</div>}
          <button className="btn-primary w-full mt-2" type="submit">
            Log In
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-slate-400">
          Not registered yet?{" "}
          <Link to="/register-verifier" className="text-primary-400 hover:underline">
            Register here
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginVerifier;
