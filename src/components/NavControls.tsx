"use client";

/**
 * NavControls — fixed Prev / Next section navigator.
 *
 * Reads waypoints from navStore (populated by ScrollEngine after mount).
 * Each press smoothly scrolls to the previous / next section.
 * The centre pill shows the current section label.
 */

import { useCallback, useEffect, useState } from "react";
import { navStore, type NavWaypoint } from "@/lib/navStore";
import { lenisStore } from "@/lib/lenisStore";

/** How close (px) to a waypoint before we consider ourselves "at" it. */
const SNAP_THRESHOLD = 80;

/** Easing used for navigation scrolls. */
const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function NavControls() {
  const [waypoints, setWaypoints] = useState<NavWaypoint[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── subscribe to waypoint updates from ScrollEngine ──────────────────────
  useEffect(() => {
    const unsub = navStore.subscribe(() => setWaypoints(navStore.get()));
    // seed in case already populated
    const current = navStore.get();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current.length) setWaypoints(current);
    return unsub;
  }, []);

  // ── track active section on scroll ───────────────────────────────────────
  useEffect(() => {
    if (!waypoints.length) return;

    const onScroll = () => {
      const sy = window.scrollY;
      // Find the last waypoint we've passed (or are very close to)
      let idx = 0;
      for (let i = 0; i < waypoints.length; i++) {
        if (sy >= waypoints[i].scroll - SNAP_THRESHOLD) idx = i;
      }
      setActiveIdx(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // seed on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [waypoints]);

  // ── navigation helpers ────────────────────────────────────────────────────
  const goTo = useCallback(
    (idx: number) => {
      if (!waypoints[idx]) return;
      lenisStore.scrollTo(waypoints[idx].scroll, {
        duration: 1.4,
        easing: ease,
      });
      setActiveIdx(idx);
    },
    [waypoints],
  );

  const prev = useCallback(
    () => goTo(Math.max(0, activeIdx - 1)),
    [goTo, activeIdx],
  );
  const next = useCallback(
    () => goTo(Math.min(waypoints.length - 1, activeIdx + 1)),
    [goTo, activeIdx, waypoints.length],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  if (!waypoints.length) return null;

  const atFirst = activeIdx === 0;
  const atLast = activeIdx === waypoints.length - 1;
  const label = waypoints[activeIdx]?.label ?? "";

  return (
    <div className="fixed bottom-8 right-8 z-900 flex items-center gap-2">
      {/* Prev */}
      <button
        onClick={prev}
        disabled={atFirst}
        aria-label="Section trước"
        title="Prev (↑)"
        className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
        style={{
          backgroundColor: atFirst
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.92)",
          border: atFirst
            ? "1px solid rgba(26,37,68,0.06)"
            : "1px solid rgba(26,37,68,0.12)",
          boxShadow: atFirst ? "none" : "0 2px 10px rgba(0,0,0,0.10)",
          cursor: atFirst ? "default" : "pointer",
          color: atFirst ? "rgba(26,37,68,0.25)" : "#1B5BC4",
        }}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12.5l5-5 5 5"
          />
        </svg>
      </button>

      {/* Label pill */}
      <div
        className="min-w-[64px] rounded-full px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
        style={{
          backgroundColor: "#1B5BC4",
          color: "#fff",
          boxShadow: "0 4px 16px rgba(27,91,196,0.30)",
        }}
      >
        {label}
      </div>

      {/* Next */}
      <button
        onClick={next}
        disabled={atLast}
        aria-label="Section tiếp theo"
        title="Next (↓)"
        className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
        style={{
          backgroundColor: atLast
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.92)",
          border: atLast
            ? "1px solid rgba(26,37,68,0.06)"
            : "1px solid rgba(26,37,68,0.12)",
          boxShadow: atLast ? "none" : "0 2px 10px rgba(0,0,0,0.10)",
          cursor: atLast ? "default" : "pointer",
          color: atLast ? "rgba(26,37,68,0.25)" : "#1B5BC4",
        }}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 7.5l5 5 5-5"
          />
        </svg>
      </button>
    </div>
  );
}
