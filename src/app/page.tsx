import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import StackedEntry from "@/components/StackedEntry";
import StackedSection from "@/components/StackedSection";
import FounderMessages from "@/components/FounderMessages";
import EndingSection from "@/components/EndingSection";
import ScrollEngine from "@/lib/ScrollEngine";
import SmoothScroll from "@/components/SmoothScroll";
import NavControls from "@/components/NavControls";

/**
 * Scroll architecture — three phases:
 *
 * ┌─ Phase 1 · Horizontal (400vw) ─────────────────────────────────────────┐
 * │  #h-track  (GSAP spacer providing 300vw of scroll height)               │
 * │  └── #h-container  (pinned, translateX 0 → −300vw)                     │
 * │       ├── Hero          100vw                                            │
 * │       ├── Gallery       200vw  cinematic image strip                    │
 * │       └── StackedEntry  100vw  poster film strip — end of horizontal    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 2 · Vertical year stories ──────────────────────────────────────┐
 * │  #stacked-section  (normal document flow after h-track)                 │
 * │  Per year: timeline-view (poster zoom → poster scroll) → highlights     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 3 · Outro ───────────────────────────────────────────────────────┐
 * │  FounderMessages (3 × full-screen) + EndingSection                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export default function Home() {
  return (
    <main id="main" className="relative bg-[#0A0A0A]">

      {/* ── Phase 1: Horizontal panels (total 400vw) ───────────────────── */}
      <div id="h-track">
        <div
          id="h-container"
          className="flex will-change-transform"
          style={{ width: "400vw" }}
        >
          <Hero />          {/* 100vw */}
          <Gallery />       {/* 200vw */}
          <StackedEntry />  {/* 100vw — last panel, visible when horizontal ends */}
        </div>
      </div>

      {/* ── Phase 2: Stacked year stories (vertical scroll) ────────────── */}
      {/*
        Sits immediately below h-track in document flow.
        GSAP pins each year's timeline-view → poster zoom → poster scroll.
        After poster exits, year highlights scroll normally.
      */}
      <StackedSection />

      {/* ── Phase 3: Outro ─────────────────────────────────────────────── */}
      <FounderMessages />
      <EndingSection />

      {/* Client-only GSAP animation engine + Lenis smooth scroll */}
      <ScrollEngine />
      <SmoothScroll />
      <NavControls />
    </main>
  );
}
