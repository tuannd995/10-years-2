"use client";

import { YearData } from "@/data/years";

export default function YearOverview({ data }: { data: YearData }) {
  return (
    <div className="year-section-panel relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      <div className="year-panel-inner mx-auto grid max-w-5xl grid-cols-1 gap-12 px-8 py-20 md:grid-cols-2">

        {/* Left — text */}
        <div className="flex flex-col justify-center gap-6">
          {/* Year badge */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: data.color }} />
            <span
              className="font-mono text-[10px] tracking-[0.45em] uppercase"
              style={{ color: data.color }}
            >
              Overview · {data.year}
            </span>
          </div>

          {/* Tagline — word reveal applied by ScrollEngine via .overview-heading */}
          <h2 className="overview-heading font-serif text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-[#1A2544]">
            {data.tagline}
          </h2>

          {/* Overview paragraph */}
          <p className="text-[15px] leading-relaxed text-[#637196]">
            {data.overview}
          </p>
        </div>

        {/* Right — stats grid */}
        <div className="year-overview-stats grid grid-cols-2 gap-4 self-center">
          {data.stats.map((s, i) => (
            <div
              key={i}
              className="stat-card flex flex-col gap-1 rounded-xl border border-[#D8E2F0] bg-[#F7F9FF] p-5"
            >
              {/* stat-value: ScrollEngine animates count-up */}
              <span
                className="stat-value font-serif text-[clamp(2rem,5vw,3rem)] font-light leading-none"
                style={{ color: data.color }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#637196] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
