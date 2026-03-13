import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import StackedSection from "@/components/StackedSection";
import FounderMessages from "@/components/FounderMessages";
import EndingSection from "@/components/EndingSection";
import ScrollEngine from "@/lib/ScrollEngine";

/**
 * Scroll architecture — two phases:
 *
 * ┌─ Phase 1 · Horizontal ─────────────────────────────────────────────────┐
 * │  #h-track  (GSAP spacer — provides scroll height for horizontal anim)  │
 * │  └── #h-container  (display:flex, pinned + translateX by ScrollTrigger)│
 * │       ├── Hero     100vw                                                │
 * │       └── Gallery  250vw                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 2 · Vertical year stories ──────────────────────────────────────┐
 * │  StackedSection  (normal document flow, after h-track)                  │
 * │  └── per year: timeline-view → poster zoom → poster scroll → highlights│
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ Phase 3 · Outro ───────────────────────────────────────────────────────┐
 * │  FounderMessages + EndingSection                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export default function Home() {
  return (
    <main id="main" className="relative bg-[#0A0A0A]">

      {/* ── Phase 1: Horizontal panels ─────────────────────────────────── */}
      {/*
        #h-track is the scroll spacer. GSAP will pin #h-container to the top
        of the viewport and convert vertical scroll into horizontal translateX.
        Height is set by ScrollTrigger dynamically based on h-container width.
      */}
      <div id="h-track">
        {/*
          #h-container total width = 100vw (hero) + 250vw (gallery) = 350vw.
          GSAP translateX range: 0 → −250vw.
        */}
        <div
          id="h-container"
          className="flex will-change-transform"
          style={{ width: "350vw" }}
        >
          <Hero />
          <Gallery />
        </div>
      </div>

      {/* ── Phase 2: Stacked year stories (vertical) ───────────────────── */}
      <StackedSection />

      {/* ── Phase 3: Outro ─────────────────────────────────────────────── */}
      <FounderMessages />
      <EndingSection />

      {/* Client-only GSAP engine — renders nothing, wires all animations */}
      <ScrollEngine />
    </main>
  );
}
