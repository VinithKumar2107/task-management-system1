import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/app/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in right now.");
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
            TaskFlow Pro
          </span>
          <div className="auth-nav">
            <Link className="auth-nav__link is-active" to="/login">Login</Link>
            <Link className="auth-nav__link" to="/register">Register</Link>
            <Link className="auth-nav__link" to="/app/dashboard">Dashboard</Link>
          </div>
        </div>

        <div className="stack-4 auth-hero__body">
          <div className="stack-3">
            <h1 className="heading-xl">Run your team’s tasks from one elegant control center.</h1>
            <p className="subtle" style={{ maxWidth: 560 }}>
              Track work, move tasks across a live Kanban board, and inspect completion trends without leaving the workspace.
            </p>
          </div>

          <div className="summary-strip">
            <div className="summary-card">
              <strong>Real-time sync</strong>
              <p>Instant board updates against the backend.</p>
            </div>
            <div className="summary-card">
              <strong>Secure auth</strong>
              <p>Session persistence with protected routes.</p>
            </div>
            <div className="summary-card">
              <strong>Dashboard ready</strong>
              <p>Jump into analytics after sign in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-card glass-strong">
        <div className="stack-4">
          <div className="stack-2">
            <span className="page-kicker">Welcome back</span>
            <h2 className="heading-lg" style={{ marginTop: "0.9rem" }}>Sign in to your workspace</h2>
            <p className="subtle">Use your account to access dashboards, boards, and analytics.</p>
          </div>

          <form className="auth-form" onSubmit={submitHandler}>
            <div className="field-grid">
              <label className="label" htmlFor="login-email">Email</label>
              <div className="auth-field-shell">
                <Mail size={17} className="muted" />
                <input id="login-email" className="auth-input" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@company.com" />
              </div>
            </div>

            <div className="field-grid">
              <label className="label" htmlFor="login-password">Password</label>
              <div className="auth-field-shell">
                <Lock size={17} className="muted" />
                <input id="login-password" className="auth-input" type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="Enter your password" />
              </div>
            </div>

            {error ? <div className="summary-card" style={{ borderColor: "hsl(var(--danger) / 0.24)" }}>{error}</div> : null}

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="subtle" style={{ textAlign: "center" }}>
            New here? <Link className="muted-link" to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;