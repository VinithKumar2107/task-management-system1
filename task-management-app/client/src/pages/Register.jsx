import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Layers3, Lock, Mail, Sparkles, User } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create account right now.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <div className="auth-hero__topbar">
          <span className="page-kicker">
            <Sparkles size={14} />
            Team onboarding
          </span>
          <div className="auth-nav">
            <Link className="auth-nav__link" to="/login">Login</Link>
            <Link className="auth-nav__link is-active" to="/register">Register</Link>
            <Link className="auth-nav__link" to="/app/dashboard">Dashboard</Link>
          </div>
        </div>

        <div className="stack-4 auth-hero__body">
          <div className="stack-3">
            <h1 className="heading-xl">Build a calmer task operating system for your team.</h1>
            <p className="subtle" style={{ maxWidth: 560 }}>
              Create a secure workspace with Kanban execution, live analytics, and polished auth flows from day one.
            </p>
          </div>

          <div className="summary-strip">
            <div className="summary-card">
              <strong>Fast onboarding</strong>
              <p>Register and enter the app with an authenticated session.</p>
            </div>
            <div className="summary-card">
              <strong>Reusable design system</strong>
              <p>Everything is built from reusable cards, panels, and states.</p>
            </div>
            <div className="summary-card">
              <strong>Dashboard access</strong>
              <p>Jump from register straight into your workspace flow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-card glass-strong">
        <div className="stack-4">
          <div className="stack-2">
            <span className="page-kicker">Create account</span>
            <h2 className="heading-lg" style={{ marginTop: "0.9rem" }}>Set up your workspace</h2>
            <p className="subtle">Register once and start tracking tasks immediately.</p>
          </div>

          <form className="auth-form" onSubmit={submitHandler}>
            <div className="field-grid">
              <label className="label" htmlFor="register-name">Full name</label>
              <div className="auth-field-shell">
                <User size={17} className="muted" />
                <input id="register-name" className="auth-input" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Alex Morgan" />
              </div>
            </div>

            <div className="field-grid">
              <label className="label" htmlFor="register-email">Email</label>
              <div className="auth-field-shell">
                <Mail size={17} className="muted" />
                <input id="register-email" className="auth-input" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@company.com" />
              </div>
            </div>

            <div className="field-grid">
              <label className="label" htmlFor="register-password">Password</label>
              <div className="auth-field-shell">
                <Lock size={17} className="muted" />
                <input id="register-password" className="auth-input" type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Create a strong password" />
              </div>
            </div>

            {error ? <div className="summary-card" style={{ borderColor: "hsl(var(--danger) / 0.24)" }}>{error}</div> : null}

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="subtle" style={{ textAlign: "center" }}>
            Already have an account? <Link className="muted-link" to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
