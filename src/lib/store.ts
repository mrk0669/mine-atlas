/**
 * Sign-in state for Mine Atlas. Accounts are saved in this browser only (localStorage).
 * Swap read/write for a backend later and the components do not need to change.
 */
import { useSyncExternalStore } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface State {
  sessionId: string | null;
  users: User[];
}

const KEY = "mineatlas:v3";

const emptyState = (): State => ({ sessionId: null, users: [] });

function read(): State {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<State>;
    if (!Array.isArray(parsed.users)) return emptyState();
    return { sessionId: parsed.sessionId ?? null, users: parsed.users };
  } catch {
    return emptyState();
  }
}

/** Returns false when storage is unavailable or full; the in-memory state still updates. */
function write(s: State): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}

let state: State = emptyState();
let loaded = false;
const listeners = new Set<() => void>();

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  state = read();
  // Keep open tabs in sync if another tab signs in or out.
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    state = read();
    listeners.forEach((l) => l());
  });
}

function update(fn: (s: State) => State): boolean {
  ensureLoaded();
  state = fn(state);
  const ok = write(state);
  listeners.forEach((l) => l());
  return ok;
}

function subscribe(listener: () => void) {
  ensureLoaded();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): State {
  ensureLoaded();
  return state;
}

export function useStore(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Non-reactive read of the current state (used by tests). */
export const getState = (): State => getSnapshot();

export const selectMe = (s: State): User | null => s.users.find((u) => u.id === s.sessionId) ?? null;

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const actions = {
  /** Returns an error message, or null when the account was created and signed in. */
  signup(input: { name: string; email: string; password: string }): string | null {
    ensureLoaded();
    const email = input.email.trim().toLowerCase();
    if (state.users.some((u) => u.email === email)) return "An account with this email already exists";
    const user: User = { id: `u_${uid()}`, name: input.name.trim(), email, password: input.password };
    update((s) => ({ ...s, users: [...s.users, user], sessionId: user.id }));
    return null;
  },

  /** Returns an error message, or null when signed in. */
  login(email: string, password: string): string | null {
    ensureLoaded();
    const user = state.users.find((u) => u.email === email.trim().toLowerCase());
    if (!user || user.password !== password) return "Incorrect email or password";
    update((s) => ({ ...s, sessionId: user.id }));
    return null;
  },

  logout() {
    update((s) => ({ ...s, sessionId: null }));
  },
};
