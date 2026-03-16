"use client";

/**
 * SmoothScroll
 * ─────────────
 * 1. Initialises Lenis (physics-based smooth scroll used by most Awwwards sites).
 * 2. Drives Lenis from GSAP's RAF so scroll timing is shared with all animations.
 * 3. Renders the scroll-progress bar (thin accent line at viewport top).
 *
 * Mount this component once, high in the tree (page.tsx / layout.tsx).
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisStore } from "@/lib/lenisStore";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis initialisation ────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out — fast start, very gentle finish
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose instance globally so other components can call lenis.scrollTo()
    lenisStore.set(lenis);

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP ticker so they share the same RAF loop
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevent lag compensation from causing stutter

    // ── Scroll progress bar ─────────────────────────────────────────────────
    // Uses scaleX (GPU-composited) for zero-jank updates
    gsap.set("#scroll-progress", { scaleX: 0, transformOrigin: "left center" });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: 0,
      onUpdate(self) {
        gsap.set("#scroll-progress", { scaleX: self.progress });
      },
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    /* Thin progress bar — fixed to viewport top */
    <div
      id="scroll-progress"
      className="pointer-events-none fixed top-0 left-0 z-9998 h-[2px] w-full origin-left bg-[#1B5BC4]"
      aria-hidden="true"
    />
  );
}
