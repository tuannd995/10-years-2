"use client";

import { YearData } from "@/data/years";

const TAG_COLORS: Record<string, string> = {
  Milestone:   "#1B5BC4",
  Launch:      "#0D7A5F",
  Award:       "#7340C8",
  Partnership: "#C45C1B",
  Expansion:   "#1B5BC4",
  Lesson:      "#637196",
  Culture:     "#C45C1B",
};

export default function YearEvents({ data }: { data: YearData }) {
  return (
    <div
      className="year-section-panel year-events-section relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#F7F9FF" }}
    >
      <div className="year-panel-inner mx-auto w-full max-w-3xl px-8 py-20">

        {/* Section header — .events-header targeted by ScrollEngine fadeUp */}
        <div className="events-header mb-12 flex items-center gap-3">
          <span className="h-px w-8" style={{ backgroundColor: data.color }} />
          <span
            className="font-mono text-[10px] tracking-[0.45em] uppercase"
            style={{ color: data.color }}
          >
            Important Events · {data.year}
          </span>
        </div>

        {/* Events list — each .event-row staggers in from left via ScrollEngine */}
        <div className="flex flex-col">
          {data.events.map((evt, i) => (
            <div
              key={i}
              className="event-row group relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Timeline connector line */}
              {i < data.events.length - 1 && (
                <div
                  className="absolute left-[19px] top-8 w-px"
                  style={{
                    height: "calc(100% - 1rem)",
                    backgroundColor: `${data.color}20`,
                  }}
                />
              )}

              {/* Timeline dot */}
              <div className="relative mt-1 flex h-10 w-10 shrink-0 items-center justify-center">
                <div
                  className="h-3 w-3 rounded-full"
                  data-year-dot={i === 0 ? data.year : undefined}
                  style={{
                    backgroundColor: data.color,
                    outline: `3px solid ${data.color}30`,
                    outlineOffset: "2px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#637196]">
                    {evt.month}
                  </span>
                  {evt.tag && (
                    <span
                      className="rounded px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] uppercase"
                      style={{
                        backgroundColor: `${TAG_COLORS[evt.tag] ?? data.color}15`,
                        color: TAG_COLORS[evt.tag] ?? data.color,
                      }}
                    >
                      {evt.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-light text-[#1A2544]">
                  {evt.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#637196]">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
