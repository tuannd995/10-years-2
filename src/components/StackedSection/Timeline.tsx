"use client";

import { useEffect, useRef } from "react";
import { YEARS } from "@/data/years";

/**
 * Timeline — sticky horizontal year indicator bar.
 *
 * • Active year dot/label updated via the "year-change" CustomEvent
 *   (dispatched by ScrollEngine) — direct DOM manipulation, no re-renders.
 * • Clicking a year dot dispatches "jump-to-year" CustomEvent, which
 *   ScrollEngine intercepts and calls lenis.scrollTo(trigger.start).
 */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll<HTMLElement>("[data-year-node]");
    if (!nodes) return;

    // ── Activate a specific year (visual update) ──────────────────────────
    const activate = (year: number) => {
      nodes.forEach((node) => {
        const y      = parseInt(node.dataset.yearNode ?? "0", 10);
        const isActive = y === year;
        const yearData = YEARS.find((d) => d.year === y);
        const dot    = node.querySelector<HTMLElement>(".timeline-dot");
        const label  = node.querySelector<HTMLElement>(".timeline-label");

        if (dot) {
          dot.style.backgroundColor = isActive
            ? (yearData?.color ?? "#1B5BC4")
            : "rgba(26,37,68,0.15)";
          dot.style.boxShadow = isActive
            ? `0 0 0 4px ${yearData?.color ?? "#1B5BC4"}25`
            : "none";
          dot.style.transform = isActive ? "scale(1.6)" : "scale(1)";
        }
        if (label) {
          label.style.color      = isActive ? (yearData?.color ?? "#1B5BC4") : "rgba(26,37,68,0.35)";
          label.style.fontWeight = isActive ? "600" : "400";
          label.style.opacity    = isActive ? "1" : "0.7";
        }
      });
    };

    activate(YEARS[0].year);

    // ── Listen for scroll-driven year changes ────────────────────────────
    const onYearChange = (e: Event) => {
      const ce = e as CustomEvent<{ year: number }>;
      activate(ce.detail.year);
    };
    window.addEventListener("year-change", onYearChange);

    // ── Click → jump to year ─────────────────────────────────────────────
    const clickHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    nodes.forEach((node) => {
      const year = parseInt(node.dataset.yearNode ?? "0", 10);
      const fn = () => {
        window.dispatchEvent(
          new CustomEvent("jump-to-year", { detail: { year } })
        );
      };
      node.addEventListener("click", fn);
      clickHandlers.push({ el: node, fn });
    });

    return () => {
      window.removeEventListener("year-change", onYearChange);
      clickHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      /* pointer-events-auto so clicks reach the dots */
      className="pointer-events-auto absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, rgba(238,242,248,0.96) 0%, transparent 100%)",
      }}
    >
      <div className="flex items-center gap-6">
        {YEARS.map((y) => (
          <div
            key={y.year}
            data-year-node={y.year}
            title={`Jump to ${y.year}`}
            className="flex cursor-pointer flex-col items-center gap-1 px-1 py-1 transition-opacity hover:opacity-100"
            style={{ opacity: 0.7 }}
          >
            <div
              className="timeline-dot h-2 w-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: "rgba(26,37,68,0.15)" }}
            />
            <span
              className="timeline-label font-mono text-[8px] tracking-widest transition-all duration-300"
              style={{ color: "rgba(26,37,68,0.35)" }}
            >
              {y.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
