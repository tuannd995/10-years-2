"use client";

/**
 * AutoScroll — floating play/pause + speed selector.
 *
 * UX:
 * - Click the play button to start / stop cinematic auto-scroll.
 * - Speed pill selector changes the multiplier (base 100 px/s).
 * - User wheel / touch / key press stops auto-scroll immediately.
 * - Stops automatically at the bottom of the page.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { lenisStore } from "@/lib/lenisStore";

const BASE_SPEED_PX_PER_SEC = 300;

const SPEED_OPTIONS = [
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2 },
  { label: "2.5×", value: 2.5 },
];

export default function AutoScroll() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // multiplier
  const [showSpeeds, setShowSpeeds] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // ── core RAF loop ────────────────────────────────────────────────────────
  const tick = useCallback(
    (now: number) => {
      const lenis = lenisStore.get();
      if (!lenis) return;

      if (lastRef.current !== null) {
        const deltaMs = now - lastRef.current;
        const advance = (BASE_SPEED_PX_PER_SEC * speed * deltaMs) / 1000;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const next = lenis.targetScroll + advance;

        if (next >= maxScroll - 4) {
          setPlaying(false);
          return;
        }
        lenis.scrollTo(next, { immediate: true });
      }

      lastRef.current = now;
      // eslint-disable-next-line react-hooks/immutability
      rafRef.current = requestAnimationFrame(tick);
    },
    [speed],
  );

  useEffect(() => {
    if (playing) {
      lastRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, tick]);

  // Stop on manual user input
  useEffect(() => {
    const stop = () => setPlaying(false);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  // Close speed panel when clicking outside
  useEffect(() => {
    if (!showSpeeds) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#autoscroll-root")) setShowSpeeds(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showSpeeds]);

  const currentLabel =
    SPEED_OPTIONS.find((o) => o.value === speed)?.label ?? "1×";

  return (
    <div
      id="autoscroll-root"
      className="fixed bottom-8 right-8 z-900 flex flex-col items-end gap-2"
    >
      {/* ── Speed selector panel ─────────────────────────────────────────── */}
      <div
        className="flex flex-col items-end gap-1 transition-all duration-200 origin-bottom"
        style={{
          opacity: showSpeeds ? 1 : 0,
          pointerEvents: showSpeeds ? "auto" : "none",
          transform: showSpeeds
            ? "translateY(0) scale(1)"
            : "translateY(6px) scale(0.97)",
        }}
      >
        {SPEED_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setSpeed(opt.value);
              setShowSpeeds(false);
            }}
            className="rounded-full px-3 py-1 font-mono text-[10px] tracking-widest transition-all duration-150"
            style={{
              backgroundColor:
                opt.value === speed ? "#1B5BC4" : "rgba(255,255,255,0.92)",
              color: opt.value === speed ? "#fff" : "#1A2544",
              boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
              border:
                opt.value === speed ? "none" : "1px solid rgba(26,37,68,0.08)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Control row: speed pill + play button ────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Speed indicator / toggle */}
        <button
          onClick={() => setShowSpeeds((v) => !v)}
          title="Change speed"
          className="rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest transition-all duration-200"
          style={{
            backgroundColor: showSpeeds ? "#1A2544" : "rgba(255,255,255,0.92)",
            color: showSpeeds ? "#fff" : "#1A2544",
            boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
            border: showSpeeds ? "none" : "1px solid rgba(26,37,68,0.08)",
          }}
        >
          {currentLabel}
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => setPlaying((p) => !p)}
          title={playing ? "Pause auto-scroll" : "Auto-scroll"}
          aria-label={playing ? "Pause auto-scroll" : "Start auto-scroll"}
          className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
          style={{
            backgroundColor: playing ? "#1B5BC4" : "rgba(255,255,255,0.92)",
            boxShadow: playing
              ? "0 0 0 0 rgba(27,91,196,0.5), 0 8px 24px rgba(27,91,196,0.35)"
              : "0 4px 20px rgba(0,0,0,0.12)",
            animation: playing
              ? "autoscroll-pulse 1.8s ease-in-out infinite"
              : "none",
            border: playing ? "none" : "1px solid rgba(26,37,68,0.1)",
          }}
        >
          {playing ? (
            <span className="flex gap-1">
              <span className="block h-4 w-[3px] rounded-full bg-white" />
              <span className="block h-4 w-[3px] rounded-full bg-white" />
            </span>
          ) : (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-0.5 h-5 w-5 text-[#1B5BC4] transition group-hover:scale-110"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
