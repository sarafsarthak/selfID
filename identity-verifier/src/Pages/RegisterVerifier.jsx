import React, { useState } from "react";
import { Link, useNavigate } from "react-router";


const EMPLOYEE_OPTIONS = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-2000",
  "2001+"
];

const DOMAIN_OPTIONS = [
  "Finance",
  "Healthcare",
  "Education",
  "IT / Software",
  "Manufacturing",
  "Retail"
];

const RegisterVerifier = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    orgName: "",
    companyEmail: "",
    address: "",
    city: "",
    pincode: "",
    employees: "",
    domain: "",
    cin: "",
    password: "",
    confirm: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://render.com/docs/web-services?_gl=1*1j3qxvl*_gcl_au*MTM1MTM5MzAxMC4xNzU3MTgwMjQ2*_ga*Mjg5NDg2ODQ4LjE3NTcxODAyNDY.*_ga_QK9L9QJC5N*czE3NTcxODAyNDYkbzEkZzEkdDE3NTcxODEyMjQkajU5JGwwJGgw#port-binding/register-verifier" , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orgName: form.orgName,
        companyEmail: form.companyEmail,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        employees: form.employees,
        domain: form.domain,
        cin: form.cin,
        password: form.password

      }),
    })

    if(form.password !== form.confirm){
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    if(response.ok){
      setSuccess("Registration Successful")
      setError("")
      setForm({
        orgName: "",
        companyEmail: "",
        address: "",
        city: "",
        pincode: "",
        employees: "",
        domain: "",
        cin: "",
        password: "",
        confirm: ""
      })

      setTimeout(() => {
        navigate('/verifier-login')
      }, 3000);
    }
    else{
      const err = await response.json()
      setError(err.message || "Registration Failed")
      setSuccess("")
    }
    
   
  }

  return (
    <div className="min-h-screen bg-app bg-radial-glow flex items-center justify-center pt-16">
      <section className="max-w-md w-full glass-card p-8 animate-fade-in">
        <h2 className="mb-2 text-center text-3xl font-bold bg-gradient-to-tr from-slate-50 to-primary-400 bg-clip-text text-transparent">
          Register Your Organization
        </h2>
        <p className="mb-6 text-center text-slate-400">
          Verifier registration for organizations—secure, trusted access.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label-dark">Name of Organisation</label>
            <input
              name="orgName"
              type="text"
              required
              className="input-dark"
              placeholder="Organisation name"
              value={form.orgName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-dark">Company Email Address</label>
            <input
              name="companyEmail"
              type="email"
              required
              className="input-dark"
              placeholder="company@email.com"
              value={form.companyEmail}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label-dark">Address</label>
            <input
              name="address"
              type="text"
              required
              className="input-dark"
              placeholder="Street address"
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
            />
          </div>
          <div>
            <label className="label-dark">City</label>
            <input
              name="city"
              type="text"
              required
              className="input-dark"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="label-dark">Pincode</label>
            <input
              name="pincode"
              type="text"
              required
              className="input-dark"
              minLength={6}
              maxLength={6}
              pattern="\d{6}"
              placeholder="e.g. 110078"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="label-dark">Number of Employees</label>
            <select
              name="employees"
              required
              className="input-dark"
              value={form.employees}
              onChange={handleChange}
            >
              <option value="">Select number</option>
              {EMPLOYEE_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-dark">Domain of Organisation</label>
            <select
              name="domain"
              required
              className="input-dark"
              value={form.domain}
              onChange={handleChange}
            >
              <option value="">Select domain</option>
              {DOMAIN_OPTIONS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-dark">Corporate Identification Number (CIN)</label>
            <input
              name="cin"
              type="text"
              className="input-dark"
              maxLength={21}
              minLength={21}
              placeholder="21-character CIN (e.g. U12345DL2020PLC123456)"
              value={form.cin}
              onChange={handleChange}
              autoComplete="off"
              style={{ textTransform: "uppercase" }}
            />
          </div>
          <div>
          <label className="label-dark">Set a Password</label>
            <input
              name="password"
              type="password"
              required
              className="input-dark"
              placeholder="Enter your password"
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
              className="input-dark"
              placeholder="Re-enter password"
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
          Already registered?{" "}
          <Link to="/verifier-login" className="text-primary-400 hover:underline">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterVerifier;
