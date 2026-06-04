// ── Module-level cache & event bus ─────────────────────────────────
export const SERVER_CACHE = {};
const SERVER_SUBSCRIBERS = new Set();
let SERVER_EVENTS = null;
let SERVER_LOAD_PROMISE = null;

// ── Base URL resolution ─────────────────────────────────────────────
function getApiBase() {
  const runtimeBase =
    (typeof window !== "undefined" && window.__API_BASE__) || "";
  const buildBase =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_API_BASE) ||
    "";
  return (runtimeBase || buildBase || "").replace(/\/$/, "");
}

// ── Low-level fetch ─────────────────────────────────────────────────
export function serverFetch(path, options) {
  const base = getApiBase();
  const url = base ? `${base}/api${path}` : `/api${path}`;
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
}

// ── Load full state from server (singleton promise, retries on fail) ─
export function loadServerState() {
  if (SERVER_LOAD_PROMISE) return SERVER_LOAD_PROMISE;
  SERVER_LOAD_PROMISE = serverFetch("/state")
    .then(async (res) => {
      if (!res.ok) return SERVER_CACHE;
      const data = await res.json();
      Object.assign(SERVER_CACHE, data);
      return SERVER_CACHE;
    })
    .catch(() => {
      // Allow retry on next call
      SERVER_LOAD_PROMISE = null;
      return SERVER_CACHE;
    });
  return SERVER_LOAD_PROMISE;
}

// ── Write a single key to the server ───────────────────────────────
export async function writeServerState(key, value) {
  SERVER_CACHE[key] = value;
  try {
    const res = await serverFetch("/state", {
      method: "POST",
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok)
      console.warn("Server returned", res.status, "for key", key);
  } catch (err) {
    console.error("Failed to save server state", key, err.message);
  }
}

// ── Read from cache ─────────────────────────────────────────────────
export function readPersist(key, def) {
  const value = SERVER_CACHE[key];
  // Treat null and undefined both as "not set" — use default
  return (value === undefined || value === null) ? def : value;
}

// ── SSE subscription ────────────────────────────────────────────────
export function initServerEvents() {
  if (SERVER_EVENTS || typeof window === "undefined") return;
  try {
    const base = getApiBase();
    const streamUrl = base ? `${base}/api/stream` : "/api/stream";
    SERVER_EVENTS = new EventSource(streamUrl);
    SERVER_EVENTS.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (!payload || !payload.key) return;
        SERVER_CACHE[payload.key] = payload.value;
        SERVER_SUBSCRIBERS.forEach((cb) => cb(payload.key, payload.value));
      } catch {}
    };
    SERVER_EVENTS.onerror = () => {
      // On error, allow re-init on next subscribe
      SERVER_EVENTS = null;
    };
  } catch (error) {
    console.warn("Server events unavailable", error);
  }
}

export function subscribeServerUpdates(callback) {
  initServerEvents();
  SERVER_SUBSCRIBERS.add(callback);
  return () => SERVER_SUBSCRIBERS.delete(callback);
}
