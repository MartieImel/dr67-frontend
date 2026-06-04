import { useState, useEffect, useCallback, useRef } from "react";
import {
  loadServerState,
  writeServerState,
  readPersist,
  subscribeServerUpdates,
} from "../lib/server";

/**
 * Persistent state synced to the backend server.
 *
 * FIX: the original implementation captured `v` in the `set` callback,
 * causing stale-closure bugs when functional updaters were used inside
 * effects or async code.  We now track the current value via a ref so
 * the callback is always stable (no `v` in its deps array).
 */
export function usePersist(key, def) {
  const [v, sv] = useState(def);
  const vRef = useRef(v);
  const [loadDone, setLoadDone] = useState(false);

  // Keep ref in sync with state
  useEffect(() => { vRef.current = v; }, [v]);

  // Load initial value from server once
  useEffect(() => {
    if (loadDone) return;
    let cancelled = false;
    loadServerState()
      .then(() => {
        if (cancelled) return;
        const val = readPersist(key, def);
        sv(val);
        vRef.current = val;
        setLoadDone(true);
      })
      .catch(() => {
        if (!cancelled) {
          sv(def);
          vRef.current = def;
          setLoadDone(true);
        }
      });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Subscribe to real-time server pushes
  useEffect(() => {
    const unsub = subscribeServerUpdates((eventKey, value) => {
      if (eventKey === key) {
        const next = value === undefined ? def : value;
        sv(next);
        vRef.current = next;
      }
    });
    return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Stable setter — does NOT depend on `v`, uses ref instead
  const set = useCallback(
    (nv) => {
      const next =
        typeof nv === "function" ? nv(vRef.current) : nv;
      sv(next);
      vRef.current = next;
      writeServerState(key, next);
    },
    [key]
  );

  return [v, set];
}
