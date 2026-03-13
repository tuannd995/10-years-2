"use client";

import { YEARS } from "@/data/years";
import Timeline from "./Timeline";
import YearScene from "./YearScene";

/**
 * StackedSection — Phase 2 of the scroll experience.
 *
 * Sits in normal document flow directly below #h-track.
 * Contains a sticky Timeline bar and all 10 YearScene components.
 *
 * The GSAP ScrollEngine (lib/ScrollEngine.tsx) pins each YearScene's
 * #timeline-view-YEAR and runs the poster zoom → poster scroll animation.
 * After each poster exits the top, YearContent highlights scroll normally.
 *
 * Active year in the Timeline bar is updated via custom "year-change" events
 * dispatched from ScrollEngine's onEnter / onEnterBack callbacks.
 */
export default function StackedSection() {
  return (
    <div id="stacked-section" className="relative w-full">
      {/* Sticky timeline bar — floats above all year content */}
      <div className="sticky top-0 z-30 h-0 w-full">
        <Timeline />
      </div>

      {/* Year scenes */}
      {YEARS.map((y, i) => (
        <YearScene key={y.year} data={y} index={i} />
      ))}
    </div>
  );
}
