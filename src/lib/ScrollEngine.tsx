"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { YEARS } from "@/data/years";

/**
 * ScrollEngine — client-only component that wires all GSAP animations.
 * Renders nothing; purely behavioural.
 *
 * Animation phases:
 *  1. Hero entrance  — stagger text in on load
 *  2. Horizontal     — #h-track pins #h-container; scroll → translateX
 *  3. Poster zoom    — each year's poster scales 1 → fullscreen width
 *  4. Poster scroll  — fullscreen poster translates up, revealing year content
 */
export default function ScrollEngine() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Collect all triggers so we can kill them on unmount
    const triggers: ScrollTrigger[] = [];

    // ── 1. Hero entrance ────────────────────────────────────────────────
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" })
      .from(
        ".hero-title span:first-child",
        { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        ".hero-title span:last-child",
        { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" },
        "-=0.65"
      )
      .from(
        ".hero-sub",
        { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        ".hero-cta",
        { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    // ── 2. Horizontal scroll ─────────────────────────────────────────────
    const hContainer = document.querySelector<HTMLElement>("#h-container");
    const hTrack = document.querySelector<HTMLElement>("#h-track");

    if (hContainer && hTrack) {
      const getScrollDist = () => hContainer.scrollWidth - window.innerWidth;

      const hTrigger = ScrollTrigger.create({
        trigger: hTrack,
        pin: true,
        start: "top top",
        end: () => `+=${getScrollDist()}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
        animation: gsap.to(hContainer, {
          x: () => -getScrollDist(),
          ease: "none",
        }),
      });

      triggers.push(hTrigger);
    }

    // ── 3 & 4. Per-year poster zoom + scroll ─────────────────────────────
    YEARS.forEach((yearData) => {
      const timelineView = document.querySelector<HTMLElement>(
        `#timeline-view-${yearData.year}`
      );
      const posterCard = document.querySelector<HTMLElement>(
        `#poster-${yearData.year}`
      );

      if (!timelineView || !posterCard) return;

      /**
       * Read poster's natural (unscaled) dimensions.
       * transformOrigin is "center center" so scaling keeps it centred.
       */
      const getScale = () => {
        // Reset any existing transform so we measure the natural size
        const rect = posterCard.getBoundingClientRect();
        return window.innerWidth / rect.width;
      };

      const getTranslateY = () => {
        const scale = getScale();
        const naturalHeight = posterCard.getBoundingClientRect().height;
        const scaledHeight = naturalHeight * scale;
        // After zoom, poster is taller than viewport. Scroll it up until
        // it fully exits the top of the screen.
        return -(scaledHeight);
      };

      /**
       * Scroll budget:
       *   - Phase A (zoom):     100vh of scroll
       *   - Phase B (translateY): proportional to poster overflow
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineView,
          start: "top top",
          end: () => {
            const scale = getScale();
            const naturalHeight = posterCard.getBoundingClientRect().height;
            const scaledHeight = naturalHeight * scale;
            // enough scroll to zoom (1×vh) + scroll full poster (scaledH)
            return `+=${window.innerHeight + scaledHeight}`;
          },
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Update the active year in the timeline bar (via CSS class)
            document
              .querySelectorAll("[data-year-active]")
              .forEach((el) => el.removeAttribute("data-year-active"));
            timelineView.setAttribute("data-year-active", "true");
          },
        },
      });

      // Phase A: scale poster to fill viewport width
      tl.to(posterCard, {
        scale: () => getScale(),
        ease: "none",
        duration: 1,
      });

      // Phase B: translate poster upward (simulate scrolling through the poster)
      tl.to(
        posterCard,
        {
          y: () => getTranslateY(),
          ease: "none",
          duration: 1.5,
        },
        // start Phase B slightly before Phase A ends for smoother feel
        "-=0.1"
      );

      triggers.push(...(ScrollTrigger.getAll().slice(-1)));
    });

    // ── Gallery item entrance (fade + rise as they come into view) ───────
    document.querySelectorAll<HTMLElement>(".gallery-item").forEach((item) => {
      const st = ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        animation: gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        }),
      });
      triggers.push(st);
    });

    // Refresh after a brief delay to let Next.js finish rendering images
    const rafId = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(rafId);
      heroTl.kill();
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
