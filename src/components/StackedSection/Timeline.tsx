"use client";

import { YEARS } from "@/data/years";

interface TimelineProps {
  activeYear: number;
}

export default function Timeline({ activeYear }: TimelineProps) {
  return (
    <div className="timeline-bar pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2">
      {/* Horizontal rule */}
      <div className="relative flex w-full items-center justify-center">
        <div className="h-px w-full max-w-5xl bg-white/10" />
      </div>

      {/* Year nodes */}
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-8">
        {YEARS.map((y) => {
          const isActive = y.year === activeYear;
          return (
            <div key={y.year} className="flex flex-col items-center gap-2">
              {/* Node */}
              <div
                className="relative flex h-3 w-3 items-center justify-center rounded-full border transition-all duration-500"
                style={{
                  borderColor: isActive ? y.color : "rgba(255,255,255,0.2)",
                  backgroundColor: isActive ? y.color : "transparent",
                  boxShadow: isActive ? `0 0 12px ${y.color}88` : "none",
                }}
              />
              {/* Year label */}
              <span
                className="font-mono text-[10px] tracking-widest transition-all duration-500"
                style={{
                  color: isActive ? y.color : "rgba(255,255,255,0.25)",
                }}
              >
                {y.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
