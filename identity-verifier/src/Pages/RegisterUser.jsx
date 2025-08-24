import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const OCCUPATIONS = [
  "Student",
  "Engineer",
  "Doctor",
  "Teacher",
  "Business Owner",
  "Government Employee",
];


const RegisterUser = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    occupation: "",
    aadhar: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.confirm){
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    const response = await fetch("http://localhost:3000/register-user" , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        dob: form.dob,
        gender: form.gender,
        occupation: form.occupation,
        aadhar: form.aadhar,
        phone: form.phone,
        password: form.password
      }),
  })
    
    if(response.ok){
      setSuccess("Registration successful!");
      setError("");
      setForm({
        name: "",
        email: "",
        dob: "",
        gender: "",
        occupation: "",
        aadhar: "",
        phone: "",
        password: "",
        confirm: "",
      });

      setTimeout(() => {
        navigate("/user-login");
      }, 2000);
   
    } else {
      const err = await response.json()
      setError(err.message || "Registration Failed")
      setSuccess("")
    }

   
   
  }

  return (
    <div className="min-h-screen bg-app bg-radial-glow flex items-center justify-center pt-16">
      <section className="max-w-md w-full glass-card p-8 animate-fade-in">
        <h2 className="mb-2 text-center text-3xl font-bold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="mb-6 text-center text-slate-400">
          Register as a user to verify your identity securely.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label-dark">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="input-dark"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-dark">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input-dark"
              autoComplete="email"
              placeholder="name@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-dark">Date of Birth</label>
            <input
              name="dob"
              type="date"
              required
              className="input-dark"
              value={form.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="label-dark">Gender</label>
            <div className="flex gap-8 mt-2">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 text-slate-300">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                    className="accent-primary-500 h-4 w-4"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label-dark">Occupation</label>
            <select
              name="occupation"
              required
              className="input-dark"
              value={form.occupation}
              onChange={handleChange}
            >
              <option value="">Select occupation</option>
              {OCCUPATIONS.map((job) => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>
          {/* <div>
            <label className="label-dark">Aadhaar Number</label>
            <input
              name="aadhar"
              type="text"
              className="input-dark"
              minLength={12}
              maxLength={12}
              pattern="\d{12}"
              placeholder="Enter 12-digit Aadhaar"
              value={form.aadhar}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div> */}
          <div>
          <label className="label-dark">Contact Number</label>
            <input
              name="phone"
              type="tel"
              required
              pattern="[0-9]{10}"
              maxLength = {10}
              autoComplete="tel"
              className="input-dark"
              placeholder="Enter your mobile number"
              value={form.phone}
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
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-dark">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              required
              minLength={6}
              className="input-dark"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
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
            Register
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/user-login" className="text-primary-400 hover:underline">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterUser;
