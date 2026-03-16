"use client";

/**
 * Cursor
 * ──────
 * Custom cursor for desktop (pointer:fine) devices.
 * - Dot  : 6 px circle, tracks mouse position exactly via GSAP quickSetter.
 * - Ring : 38 px circle, follows with lerp inertia (feels magnetic / physical).
 *
 * The ring uses `mix-blend-mode: exclusion` so it appears as a white ghost on
 * dark sections and a dark ghost on light sections — zero manual colour switching.
 *
 * Interaction states (added via data-cursor attributes on any element):
 *   [data-cursor="view"]   → ring scales to 2.6×, shows "VIEW" label
 *   [data-cursor="drag"]   → ring scales to 2.6×, shows "DRAG" label
 *   default hover          → ring scales to 1.8×
 *
 * Hidden on touch devices and while the mouse hasn't entered the viewport yet.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only show on devices with a precise pointer (mouse / stylus)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // ── Position setters (quickSetter is faster than gsap.set on every frame) ─
    const setDotX  = gsap.quickSetter(dot,  "x", "px");
    const setDotY  = gsap.quickSetter(dot,  "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    let mx = 0, my = 0;   // raw mouse position
    let rx = 0, ry = 0;   // ring lerp position
    let visible = false;

    // ── Mouse tracking ──────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setDotX(mx);
      setDotY(my);

      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      visible = false;
    };

    // ── Ring lerp loop ──────────────────────────────────────────────────────
    const lerp = 0.11; // lower = more lag / heavier feel
    const ticker = () => {
      rx += (mx - rx) * lerp;
      ry += (my - ry) * lerp;
      setRingX(rx);
      setRingY(ry);
    };
    gsap.ticker.add(ticker);

    // ── Hover detection ─────────────────────────────────────────────────────
    const onEnter = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]") ??
                 (e.target as HTMLElement).closest<HTMLElement>("a, button, [role='button'], .cursor-hover");
      if (!el) return;

      const mode = el.dataset.cursor ?? "hover";
      const scale = mode === "view" || mode === "drag" ? 2.6 : 1.8;

      gsap.to(dot, { scale: 0, duration: 0.3 });
      gsap.to(ring, { scale, duration: 0.4, ease: "power2.out" });

      if (mode === "view" || mode === "drag") {
        label.textContent = mode.toUpperCase();
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    };

    const onExit = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(ring, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    // Delegate via document — picks up dynamically added elements
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onExit, true);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onExit, true);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      {/* Dot — precise tracker */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B5BC4] opacity-0"
        style={{ willChange: "transform" }}
      />

      {/* Ring — lagging follower with blend mode */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full opacity-0"
        style={{
          border: "1.5px solid rgba(255,255,255,0.9)",
          mixBlendMode: "exclusion",
          backgroundColor: "rgba(255,255,255,0.06)",
          willChange: "transform",
        }}
      >
        <span
          ref={labelRef}
          className="pointer-events-none select-none font-mono text-[7px] tracking-[0.2em] text-white opacity-0"
        />
      </div>
    </>
  );
}
