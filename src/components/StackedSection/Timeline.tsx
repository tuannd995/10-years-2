"use client";

import { useEffect, useRef } from "react";
import { YEARS } from "@/data/years";

/**
 * Timeline — sticky progress bar floating above all year content.
 *
 * Active year is updated by listening to the custom "year-change" event
 * dispatched by ScrollEngine when each year's timeline-view enters the
 * viewport. Uses direct DOM manipulation instead of React state to avoid
 * re-renders on every scroll event.
 */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll<HTMLElement>(
      "[data-year-node]"
    );
    if (!nodes) return;

    const activate = (year: number) => {
      nodes.forEach((node) => {
        const y = parseInt(node.dataset.yearNode ?? "0", 10);
        const isActive = y === year;
        const yearData = YEARS.find((d) => d.year === y);
        const dot = node.querySelector<HTMLElement>(".timeline-dot");
        const label = node.querySelector<HTMLElement>(".timeline-label");

        if (dot) {
          dot.style.borderColor = isActive
            ? (yearData?.color ?? "#C9A96E")
            : "rgba(255,255,255,0.2)";
          dot.style.backgroundColor = isActive
            ? (yearData?.color ?? "#C9A96E")
            : "transparent";
          dot.style.boxShadow = isActive
            ? `0 0 10px ${yearData?.color ?? "#C9A96E"}88`
            : "none";
          dot.style.transform = isActive ? "scale(1.4)" : "scale(1)";
        }

        if (label) {
          label.style.color = isActive
            ? (yearData?.color ?? "#C9A96E")
            : "rgba(255,255,255,0.22)";
          label.style.opacity = isActive ? "1" : "0.7";
        }
      });
    };

    // Initialise with the first year
    activate(YEARS[0].year);

    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ year: number }>;
      activate(ce.detail.year);
    };

    window.addEventListener("year-change", handler);
    return () => window.removeEventListener("year-change", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-14 items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, transparent 100%)",
      }}
    >
      {/* Year nodes */}
      <div className="flex items-center gap-5">
        {YEARS.map((y) => (
          <div
            key={y.year}
            data-year-node={y.year}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className="timeline-dot h-2 w-2 rounded-full border transition-all duration-400"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                backgroundColor: "transparent",
              }}
            />
            <span
              className="timeline-label font-mono text-[8px] tracking-widest transition-all duration-400"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {y.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
