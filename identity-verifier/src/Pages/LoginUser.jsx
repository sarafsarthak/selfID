import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [item, setItem] = useState("")
  const [form, setForm] = useState({
    email: "",
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

    const response = await fetch("https://render.com/docs/web-services?_gl=1*1j3qxvl*_gcl_au*MTM1MTM5MzAxMC4xNzU3MTgwMjQ2*_ga*Mjg5NDg2ODQ4LjE3NTcxODAyNDY.*_ga_QK9L9QJC5N*czE3NTcxODAyNDYkbzEkZzEkdDE3NTcxODEyMjQkajU5JGwwJGgw#port-binding/user-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await response.json()
    if(response.ok){
      localStorage.setItem("token", data.token)
      navigate('/user-dashboard')
    }else{
      setSuccess("Invalid email or password")
    }

  }

    
    
  

  return (
    <div className="min-h-screen bg-app bg-radial-glow flex items-center justify-center pt-16">
      <section className="max-w-md w-full glass-card p-8 animate-fade-in">
        <h2 className="mb-2 text-center text-3xl font-bold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
          Log in to your account
        </h2>
        <p className="mb-6 text-center text-slate-400">
          Enter your registered email and password.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label-dark">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input-dark"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-dark">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="input-dark"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-sm text-red-400 text-center">{error}</div>
          )}
          {success && (
            <div className="text-sm text-emerald-400 text-center">{success}</div>
          )}
          <button className="btn-primary w-full mt-2" type="submit">
            Log In
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-slate-400">
          New to selfID?{" "}
          <Link to="/register-user" className="text-primary-400 hover:underline">
            Register
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginUser;
