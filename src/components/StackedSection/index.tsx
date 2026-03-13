"use client";

import { YEARS } from "@/data/years";
import Timeline from "./Timeline";
import YearScene from "./YearScene";

/**
 * StackedSection — Phase 2 of the scroll experience.
 *
 * Sits in normal document flow immediately below the #h-track horizontal
 * section. The GSAP ScrollEngine (ScrollEngine.tsx) pins each YearScene's
 * timeline-view and runs the poster-zoom → poster-scroll animation.
 *
 * The sticky Timeline bar floats above all content and shows which year
 * the user is currently viewing. The active year is toggled via the
 * `data-year-active` attribute set by ScrollEngine.
 */
export default function StackedSection() {
  return (
    <div id="stacked-section" className="relative w-full">
      {/* Sticky timeline bar — floats above all year content */}
      <div className="pointer-events-none sticky top-0 z-30 h-0">
        <Timeline activeYear={YEARS[0].year} />
      </div>

      {/* Year scenes stacked vertically */}
      {YEARS.map((y, i) => (
        <YearScene key={y.year} data={y} index={i} />
      ))}
    </div>
  );
}
