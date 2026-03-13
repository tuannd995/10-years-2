"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { YEARS } from "@/data/years";

/**
 * ScrollEngine — client-only GSAP animation orchestrator.
 * Renders nothing to the DOM.
 *
 * ┌─ Phase 1 · Horizontal ──────────────────────────────────────────────────┐
 * │  Pin #h-track; translateX #h-container from 0 → −300vw                  │
 * │  (Hero 100vw + Gallery 200vw + StackedEntry 100vw = 400vw total;         │
 * │   scroll distance = 400vw − 100vw = 300vw)                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 2 · Per-year poster scenes ─────────────────────────────────────┐
 * │  For each year (2016-2025):                                             │
 * │  a) Pin #timeline-view-YEAR                                             │
 * │  b) Scale #poster-YEAR: natural size → viewport width (zoom to fill)   │
 * │  c) TranslateY #poster-YEAR: 0 → −scaledHeight (scroll through poster) │
 * │  d) Unpin → YearContent highlights scroll normally                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 3 · Content + Outro ────────────────────────────────────────────┐
 * │  Staggered entrance animations for year highlights and founder messages │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export default function ScrollEngine() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── 1. Hero entrance ─────────────────────────────────────────────────
    gsap.timeline({ delay: 0.25 })
      .from(".hero-eyebrow",               { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" })
      .from(".hero-title span:first-child", { opacity: 0, y: 44, duration: 0.9, ease: "power3.out" }, "-=0.30")
      .from(".hero-title span:last-child",  { opacity: 0, y: 44, duration: 0.9, ease: "power3.out" }, "-=0.62")
      .from(".hero-sub",                    { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" }, "-=0.40")
      .from(".hero-cta",                    { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" }, "-=0.30");

    // ── 2. Phase 1 — Horizontal scroll ───────────────────────────────────
    const hContainer = document.querySelector<HTMLElement>("#h-container");
    const hTrack     = document.querySelector<HTMLElement>("#h-track");

    if (hContainer && hTrack) {
      // 400vw container − 100vw viewport = 300vw scroll distance
      const getScrollDist = () => hContainer.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        id: "horizontal",
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
    }

    // ── 3. Phase 2 — Per-year poster zoom + scroll ────────────────────────
    YEARS.forEach((yearData) => {
      const timelineView = document.querySelector<HTMLElement>(`#timeline-view-${yearData.year}`);
      const posterCard   = document.querySelector<HTMLElement>(`#poster-${yearData.year}`);
      if (!timelineView || !posterCard) return;

      /*
       * CRITICAL: measure natural (un-transformed) dimensions ONCE before
       * any GSAP tweens run. getBoundingClientRect() returns the *scaled*
       * size after transforms, so we must read offsetWidth/offsetHeight here.
       */
      const naturalW = posterCard.offsetWidth;
      const naturalH = posterCard.offsetHeight;

      // Scale factor that makes poster.width === viewport.width
      const getScale = () => window.innerWidth / naturalW;

      /*
       * After zoom (scale applied), poster height in screen pixels:
       *   scaledH = naturalH × scale
       *
       * We translateY by −scaledH so the poster fully exits the TOP of the
       * viewport, revealing year content below.
       *
       * We stop at −(scaledH − viewportH) to keep the bottom of the poster
       * at the bottom of the viewport before the final exit, giving a smooth
       * "scrolling through the image" feel. Then we continue up by another
       * viewportH to fully exit.
       */
      const getTranslateY = () => {
        const scale = getScale();
        const scaledH = naturalH * scale;
        return -(scaledH); // exit fully above viewport
      };

      /*
       * Total scroll budget for the pin:
       *   - Zoom phase (A):  1.0 × viewportH
       *   - Scroll phase (B): scaled poster height (poster exits top)
       * Total ≈ viewportH + scaledH
       */
      const getTotalPinLength = () => {
        const scaledH = naturalH * getScale();
        return window.innerHeight + scaledH;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineView,
          start: "top top",
          end: () => `+=${getTotalPinLength()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // Update timeline bar active dot
          onEnter:     () => window.dispatchEvent(new CustomEvent("year-change", { detail: { year: yearData.year } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent("year-change", { detail: { year: yearData.year } })),
        },
      });

      // Phase A — zoom: scale poster until its width fills the viewport
      tl.to(posterCard, {
        scale: () => getScale(),
        ease: "none",
        duration: 1,
      });

      // Phase B — scroll: translate poster upward; year content reveals below
      tl.to(posterCard, {
        y: () => getTranslateY(),
        ease: "none",
        duration: 1.5,
      });
    });

    // ── 4. Year highlight entrance animations ─────────────────────────────
    document.querySelectorAll<HTMLElement>(".year-highlight").forEach((el) => {
      const inner = el.querySelector<HTMLElement>(".relative.z-10");
      if (!inner) return;
      gsap.from(inner, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ── 5. Founder messages entrance ──────────────────────────────────────
    document.querySelectorAll<HTMLElement>(".founder-message").forEach((el) => {
      const quote  = el.querySelector(".founder-quote");
      const body   = el.querySelector(".founder-body");
      const author = el.querySelector(".founder-author");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      if (quote)  tl.from(quote,  { opacity: 0, y: 32, duration: 0.9, ease: "power3.out" });
      if (body)   tl.from(body,   { opacity: 0, y: 20, duration: 0.75, ease: "power2.out" }, "-=0.40");
      if (author) tl.from(author, { opacity: 0, y: 14, duration: 0.65, ease: "power2.out" }, "-=0.30");
    });

    // ── 6. Ending section entrance ────────────────────────────────────────
    const endTitle = document.querySelectorAll(".ending-title");
    if (endTitle.length) {
      gsap.from(endTitle, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#ending", start: "top 70%" },
      });
    }

    // Allow images to load before first refresh
    const timer = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return null;
}
