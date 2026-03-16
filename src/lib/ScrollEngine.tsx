"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { YEARS } from "@/data/years";
import { PHOTO_W, PHOTO_H } from "@/components/StackedSection/YearMoments";
import { lenisStore } from "@/lib/lenisStore";
import { navStore } from "@/lib/navStore";

// ── Gallery stack config (mirrors YearMoments visual) ────────────────────────
const STACK_CONFIGS = [
  { y: 0,  rotation: 0,    scale: 1,    opacity: 1.0  },
  { y: 14, rotation: 2.8,  scale: 0.97, opacity: 0.85 },
  { y: 28, rotation: -2.2, scale: 0.94, opacity: 0.70 },
  { y: 42, rotation: 1.8,  scale: 0.91, opacity: 0.55 },
  { y: 54, rotation: 0,    scale: 0.88, opacity: 0.0  },
] as const;
const STACK_HIDDEN = { y: 60, rotation: 0, scale: 0.86, opacity: 0 } as const;
const SCROLL_PER_PHOTO = () => window.innerHeight * 1.2;

// ── Text-split utilities ──────────────────────────────────────────────────────

/** Split element text into character spans for staggered reveal. */
function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.innerHTML = text
    .split("")
    .map((ch) =>
      ch === " "
        ? `<span style="display:inline-block;width:0.28em"> </span>`
        : `<span class="ch" style="display:inline-block">${ch}</span>`
    )
    .join("");
  return Array.from(el.querySelectorAll<HTMLElement>(".ch"));
}

/** Split element text into word spans for clip-mask word reveal. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent?.trim() ?? "";
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (w) =>
        `<span class="rw-wrap"><span class="rw">${w}</span></span>`
    )
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".rw"));
}

/**
 * Apply a word-reveal animation on scroll to all elements matching `selector`.
 * Safely no-ops if no elements are found.
 */
function revealOnScroll(
  selector: string,
  opts: { stagger?: number; duration?: number; start?: string; y?: number } = {}
) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const inners = splitWords(el);
    if (!inners.length) return;
    gsap.from(inners, {
      y: opts.y ?? "115%",
      opacity: 0,
      duration: opts.duration ?? 0.9,
      stagger: opts.stagger ?? 0.055,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: opts.start ?? "top 88%",
        once: true,
      },
    });
  });
}

/** Fade + slide-up entrance for any element. */
function fadeUp(selector: string, opts: { y?: number; stagger?: number; start?: string } = {}) {
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (!els.length) return;
  gsap.from(els, {
    opacity: 0,
    y: opts.y ?? 24,
    duration: 0.75,
    stagger: opts.stagger ?? 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: els[0],
      start: opts.start ?? "top 88%",
      once: true,
    },
  });
}

export default function ScrollEngine() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── 1. Hero entrance — character-level stagger ────────────────────────────
    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl.from(".hero-eyebrow", {
      opacity: 0, y: 12, duration: 0.6, ease: "power2.out",
    });

    // Split hero title spans into characters for a cinematic char reveal
    const heroTitleSpans = document.querySelectorAll<HTMLElement>(".hero-title span");
    heroTitleSpans.forEach((span, si) => {
      const chars = splitChars(span);
      heroTl.from(
        chars,
        {
          opacity: 0,
          y: 55,
          rotateX: -35,
          stagger: 0.035,
          duration: 0.85,
          ease: "power3.out",
        },
        si === 0 ? "-=0.3" : "-=0.55"  // overlap second line with first
      );
    });

    heroTl
      .from(".hero-sub",  { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" }, "-=0.4")
      .from(".hero-cta",  { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" }, "-=0.3");

    // Subtle breathing float on the decorative "Est. 2016" stamp
    gsap.to(".hero-stamp", { y: -6, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // ── 2. Phase 1 — Horizontal scroll ───────────────────────────────────────
    const hContainer = document.querySelector<HTMLElement>("#h-container");
    const hTrack     = document.querySelector<HTMLElement>("#h-track");

    // Store the pan tween separately so it can be used as containerAnimation
    // for child elements inside the horizontal section.
    let hPanAnim: gsap.core.Tween | null = null;

    if (hContainer && hTrack) {
      const getDist = () => hContainer.scrollWidth - window.innerWidth;
      hPanAnim = gsap.to(hContainer, { x: () => -getDist(), ease: "none" });
      ScrollTrigger.create({
        id: "horizontal",
        trigger: hTrack,
        pin: true,
        start: "top top",
        end: () => `+=${getDist()}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
        animation: hPanAnim,
      });
    }

    // ── 3 + 4. Per-year: poster scene → gallery stack (strict DOM order) ─────
    YEARS.forEach((yearData, i) => {

      // ── POSTER SCENE ────────────────────────────────────────────────────────
      const posterListView = document.querySelector<HTMLElement>(`#poster-list-${yearData.year}`);
      const posterStrip    = document.querySelector<HTMLElement>(`#poster-strip-${yearData.year}`);
      const activePoster   = document.querySelector<HTMLElement>(`#poster-card-${yearData.year}`);

      if (posterListView && posterStrip && activePoster) {
        const POSTER_W   = parseInt(posterStrip.dataset.posterW   ?? "300", 10);
        const POSTER_H   = parseInt(posterStrip.dataset.posterH   ?? "450", 10);
        const POSTER_GAP = parseInt(posterStrip.dataset.posterGap ?? "56",  10);

        const stride         = POSTER_W + POSTER_GAP;
        const getCentreX     = () => (window.innerWidth - POSTER_W) / 2 - i * stride;
        const getInitialX    = () => getCentreX() + 120;
        const getSiblings    = () =>
          Array.from(posterStrip.querySelectorAll<HTMLElement>(".poster-strip-item")).filter(
            (el) => el.id !== `poster-card-${yearData.year}`
          );

        const getScale       = () => window.innerWidth / POSTER_W;
        const getPhaseBY     = () => -(window.innerHeight / 2 - POSTER_H / 2);
        const getPhaseCY     = () => getPhaseBY() - POSTER_H * getScale();
        const getTotalBudget = () => window.innerHeight * 1.8 + POSTER_H * getScale();

        gsap.set(posterStrip, { yPercent: -50, x: getInitialX() });
        gsap.set(activePoster, { transformOrigin: "50% 0" });

        const posterTl = gsap.timeline({
          scrollTrigger: {
            trigger: posterListView,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${getTotalBudget()}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter:     () => window.dispatchEvent(new CustomEvent("year-change", { detail: { year: yearData.year } })),
            onEnterBack: () => window.dispatchEvent(new CustomEvent("year-change", { detail: { year: yearData.year } })),
          },
        });

        posterTl.to(posterStrip, { x: () => getCentreX(), ease: "power1.inOut", duration: 1 });
        posterTl.to(activePoster, { scale: () => getScale(), y: () => getPhaseBY(), ease: "none", duration: 1 }, "zoom");
        posterTl.to(getSiblings(), { opacity: 0, duration: 0.5, ease: "power1.in" }, "zoom");
        posterTl.to(activePoster, { y: () => getPhaseCY(), ease: "none", duration: 1.8 });
      }

      // ── GALLERY STACK ────────────────────────────────────────────────────────
      const gallerySection = document.querySelector<HTMLElement>(`#gallery-${yearData.year}`);
      if (!gallerySection) return;

      const items = Array.from(
        gallerySection.querySelectorAll<HTMLElement>(`.stack-item-${yearData.year}`)
      );
      const n = items.length;
      if (n === 0) return;

      items.forEach((item, j) => {
        const cfg = j < STACK_CONFIGS.length ? STACK_CONFIGS[j] : STACK_HIDDEN;
        gsap.set(item, {
          y: cfg.y, rotation: cfg.rotation,
          scale: cfg.scale, opacity: cfg.opacity,
          zIndex: n - j,
        });
      });

      const galleryTl = gsap.timeline({ paused: true });

      for (let k = 0; k < n - 1; k++) {
        const current = items[k];
        const next    = items[k + 1];
        const t       = k;

        galleryTl.to(current, {
          y: -(PHOTO_H * 1.4),
          x: k % 2 === 0 ? PHOTO_W * 0.12 : -(PHOTO_W * 0.12),
          rotation: k % 2 === 0 ? 13 : -13,
          opacity: 0, scale: 0.88,
          duration: 0.55, ease: "power2.in",
        }, t);

        galleryTl.to(next, {
          y: 0, x: 0, rotation: 0, scale: 1, opacity: 1,
          duration: 0.55, ease: "power2.out",
        }, t + 0.15);

        for (let m = k + 2; m < Math.min(k + 6, n); m++) {
          const offset = m - (k + 1);
          const cfg = offset < STACK_CONFIGS.length ? STACK_CONFIGS[offset] : STACK_HIDDEN;
          galleryTl.to(items[m], {
            y: cfg.y, rotation: cfg.rotation, scale: cfg.scale, opacity: cfg.opacity,
            duration: 0.45,
          }, t + 0.15);
        }
      }

      let lastGalleryIndex = 0;

      const flushMeta = (idx: number) => {
        const m = yearData.moments[idx];
        if (!m) return;
        const q = (cls: string) => gallerySection.querySelector<HTMLElement>(`.${cls}`);
        const d = q("gallery-meta-date");        if (d)  d.textContent  = m.date;
        const l = q("gallery-meta-location");    if (l)  l.textContent  = m.location;
        const e = q("gallery-meta-event");       if (e)  e.textContent  = m.event;
        const p = q("gallery-meta-description"); if (p)  p.textContent  = m.description;
        const c = q("gallery-meta-counter");
        if (c) c.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      };

      const animateGalleryMeta = (idx: number) => {
        const wrapper = gallerySection.querySelector<HTMLElement>(".gallery-meta-wrapper");
        if (!wrapper) { flushMeta(idx); return; }
        gsap.to(wrapper, {
          opacity: 0, y: -14, duration: 0.18, ease: "power2.in",
          onComplete() {
            flushMeta(idx);
            gsap.fromTo(wrapper,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
          },
        });
      };

      ScrollTrigger.create({
        trigger: gallerySection,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${(n - 1) * SCROLL_PER_PHOTO()}`,
        scrub: 1.2,
        animation: galleryTl,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const newIndex = Math.min(Math.round(self.progress * (n - 1)), n - 1);
          if (newIndex !== lastGalleryIndex) {
            lastGalleryIndex = newIndex;
            animateGalleryMeta(newIndex);
          }
        },
      });
    });

    // ── 5. Year section entrance animations ───────────────────────────────────
    document.querySelectorAll<HTMLElement>(".year-section-panel").forEach((el) => {
      const inner = el.querySelector<HTMLElement>(".year-panel-inner");
      if (!inner) return;
      gsap.from(inner, {
        opacity: 0, y: 32, duration: 0.85, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none reverse" },
      });
    });

    // ── 6. Founder messages ───────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>(".founder-message").forEach((el) => {
      const quote  = el.querySelector(".founder-quote");
      const body   = el.querySelector(".founder-body");
      const author = el.querySelector(".founder-author");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" },
      });
      if (quote)  tl.from(quote,  { opacity: 0, y: 28, duration: 0.9, ease: "power3.out" });
      if (body)   tl.from(body,   { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" }, "-=0.40");
      if (author) tl.from(author, { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" }, "-=0.30");
    });

    // ── 7. Ending section ─────────────────────────────────────────────────────
    gsap.from(".ending-title", {
      opacity: 0, y: 36, stagger: 0.14, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: "#ending", start: "top 70%" },
    });

    // ════════════════════════════════════════════════════════════════════════
    // ── 8. ENHANCED ANIMATIONS ──────────────────────────────────────────────
    // ════════════════════════════════════════════════════════════════════════

    // ── 8a. Year overview: heading word reveal ────────────────────────────────
    revealOnScroll(".overview-heading", { stagger: 0.07, duration: 0.95 });

    // ── 8b. Year overview: stat count-up ─────────────────────────────────────
    document.querySelectorAll<HTMLElement>(".stat-value").forEach((el) => {
      const raw = el.textContent?.trim() ?? "";
      // Match format like "200", "$2M", "100%", "3×", "10×", "v1.0"
      const m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
      if (!m) return;
      const [, prefix, numStr, suffix] = m;
      const target = parseFloat(numStr);
      if (isNaN(target) || target < 2) return; // skip tiny numbers / strings like "v1.0"

      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate() {
          el.textContent =
            prefix + (target % 1 === 0 ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
        },
        onComplete() {
          el.textContent = raw; // restore exact original text
        },
      });
    });

    // ── 8c. Year overview: stat cards stagger in ─────────────────────────────
    document.querySelectorAll<HTMLElement>(".year-overview-stats").forEach((wrap) => {
      const cards = wrap.querySelectorAll<HTMLElement>(".stat-card");
      gsap.from(cards, {
        opacity: 0,
        y: 28,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
      });
    });

    // ── 8d. Year events: items stagger from left ──────────────────────────────
    document.querySelectorAll<HTMLElement>(".year-events-section").forEach((section) => {
      const rows = section.querySelectorAll<HTMLElement>(".event-row");
      gsap.from(rows, {
        opacity: 0,
        x: -36,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      // Also animate the section header label + heading
      const header = section.querySelector<HTMLElement>(".events-header");
      if (header) {
        fadeUp(".events-header", { y: 20, start: "top 85%" });
      }
    });

    // ── 8e. Parallax depth on poster-wall backgrounds ─────────────────────────
    // The ghost year number gets a subtle vertical parallax
    document.querySelectorAll<HTMLElement>(".poster-list-view").forEach((view) => {
      const ghost = view.querySelector<HTMLElement>(".year-ghost");
      if (!ghost) return;
      gsap.to(ghost, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: view,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // ── 8f. Horizontal gallery images: reveal as each card pans into view ───
    // Uses containerAnimation so reveal is driven by the horizontal pan progress,
    // not by vertical scroll position. This avoids premature opacity:0 on mount.
    if (hPanAnim) {
      document.querySelectorAll<HTMLElement>(".gallery-img-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: hPanAnim!,
              start: "left 92%",
              once: true,
            },
          }
        );
      });
    }

    // ── 8g. Founder quote mark decorative fade ────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".founder-message").forEach((el) => {
      const deco = el.querySelector<HTMLElement>(".founder-deco");
      if (!deco) return;
      gsap.from(deco, {
        opacity: 0,
        scale: 0.7,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    });

    // ── 8h. Timeline dot pulse on active year ─────────────────────────────────
    const onYearChange = (e: Event) => {
      const year = (e as CustomEvent<{ year: number }>).detail.year;
      const dot = document.querySelector<HTMLElement>(`[data-year-dot="${year}"]`);
      if (dot) {
        gsap.fromTo(dot, { scale: 1 }, { scale: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" });
      }
    };
    window.addEventListener("year-change", onYearChange);

    // ── 8i. Timeline click → jump-to-year ─────────────────────────────────────
    // Timeline dispatches "jump-to-year"; we resolve the correct scroll offset
    // from the ScrollTrigger and hand it to Lenis for a smooth cinematic jump.
    const onJumpToYear = (e: Event) => {
      const year = (e as CustomEvent<{ year: number }>).detail.year;
      const st = ScrollTrigger.getAll().find(
        (t) => (t.trigger as HTMLElement | null)?.id === `poster-list-${year}`
      );
      if (st) {
        lenisStore.scrollTo(st.start, {
          duration: 1.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };
    window.addEventListener("jump-to-year", onJumpToYear);

    // ── Single refresh + waypoint collection ─────────────────────────────────
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Wait one rAF so pin spacers are fully applied before measuring offsets
      requestAnimationFrame(() => {
        const pts: { scroll: number; label: string }[] = [];

        // Hero — always at the very top
        pts.push({ scroll: 0, label: "Mở đầu" });

        // Each year's poster-list pin start
        YEARS.forEach((yd) => {
          const st = ScrollTrigger.getAll().find(
            (t) => (t.trigger as HTMLElement | null)?.id === `poster-list-${yd.year}`
          );
          if (st) pts.push({ scroll: Math.round(st.start), label: String(yd.year) });
        });

        // Founder messages
        const founderEl = document.querySelector<HTMLElement>("#founder-messages");
        if (founderEl) {
          pts.push({
            scroll: Math.round(founderEl.getBoundingClientRect().top + window.scrollY),
            label: "Thông điệp",
          });
        }

        // Ending section
        const endingEl = document.querySelector<HTMLElement>("#ending");
        if (endingEl) {
          pts.push({
            scroll: Math.round(endingEl.getBoundingClientRect().top + window.scrollY),
            label: "Kết thúc",
          });
        }

        navStore.set(pts);
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("year-change", onYearChange);
      window.removeEventListener("jump-to-year", onJumpToYear);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return null;
}
