import { useState, type FormEvent } from "react";
import { Pickaxe } from "lucide-react";
import { toast } from "sonner";
import { actions } from "../lib/store";

type Mode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (name.trim().length < 2) return setError("Please enter your name");
      if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email");
      if (password.length < 6) return setError("Password must be at least 6 characters");
      const err = actions.signup({ name, email, password });
      if (err) return setError(err);
      toast.success(`Welcome, ${name.trim().split(/\s+/)[0]}!`);
    } else {
      const err = actions.login(email, password);
      if (err) return setError(err);
      toast.success("Signed in");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-brand">
          <Pickaxe size={22} />
          <span>MINE ATLAS</span>
        </div>
        <h1 style={{ fontSize: "1.6rem" }}>{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="muted" style={{ marginTop: 6 }}>Mines of India and official mining news.</p>

        <div className="seg" role="tablist" aria-label="Account">
          <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "on" : ""} onClick={() => switchMode("login")}>
            Sign in
          </button>
          <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "on" : ""} onClick={() => switchMode("signup")}>
            Sign up
          </button>
        </div>

        <form onSubmit={submit} style={{ marginTop: 20 }} noValidate>
          {mode === "signup" && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn primary block">
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="muted" style={{ marginTop: 14, fontSize: "0.8rem" }}>
          Accounts are saved in this browser.
        </p>
      </div>
    </div>
  );
}
