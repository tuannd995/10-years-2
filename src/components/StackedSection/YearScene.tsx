"use client";

import Image from "next/image";
import { YearData } from "@/data/years";
import YearContent from "./YearContent";

interface YearSceneProps {
  data: YearData;
  index: number;
}

/**
 * YearScene — one complete year in Phase 2.
 *
 * DOM structure:
 *   #year-scene-YEAR
 *     #timeline-view-YEAR   ← GSAP pins this; poster zooms here
 *       #poster-YEAR        ← GSAP scales (1 → fullscreen) then translateY
 *     #content-YEAR         ← revealed as poster exits top
 *
 * IMPORTANT: timeline-view must NOT have overflow-hidden because the poster
 * grows beyond its bounds during the zoom phase.
 */
export default function YearScene({ data, index }: YearSceneProps) {
  return (
    <div
      id={`year-scene-${data.year}`}
      className="year-scene relative w-full"
      data-year={data.year}
      data-index={index}
    >
      {/* ── Timeline viewport ────────────────────────────────────────────── */}
      {/*
        No overflow-hidden here! The poster card scales beyond these bounds.
        GSAP will pin this section while running the poster zoom + scroll.
      */}
      <div
        id={`timeline-view-${data.year}`}
        className="timeline-view relative flex h-screen w-full items-center justify-center bg-[#0A0A0A]"
      >
        {/* Large ghosted year behind poster */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span
            className="font-mono text-[clamp(8rem,22vw,20rem)] font-black leading-none"
            style={{ color: `${data.color}07` }}
          >
            {data.year}
          </span>
        </div>

        {/* Poster card — GSAP target for scale + translateY */}
        <div
          id={`poster-${data.year}`}
          className="poster-card relative overflow-hidden"
          style={{
            /*
             * Natural size: approx 20vw wide × 30vw tall (2:3 portrait ratio).
             * GSAP will scale this until width === 100vw.
             * transformOrigin must stay "center center" so it expands evenly.
             */
            width: "clamp(140px, 20vw, 260px)",
            height: "clamp(210px, 30vw, 390px)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <Image
            src={data.posterImage}
            alt={`${data.year} — ${data.tagline}`}
            fill
            sizes="(max-width: 768px) 40vw, 260px"
            className="object-cover"
            priority={index === 0}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

          {/* Year + tagline */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: `${data.color}99` }}
            >
              {data.year}
            </p>
            <h2 className="mt-0.5 font-serif text-lg font-light leading-snug text-white">
              {data.tagline}
            </h2>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[8px] tracking-[0.45em] text-white/18 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-linear-to-b from-white/20 to-transparent" />
        </div>

        {/* Year index — top right */}
        <div className="absolute right-10 top-10">
          <span className="font-mono text-xs text-white/15">
            {String(index + 1).padStart(2, "0")} / 10
          </span>
        </div>
      </div>

      {/* ── Year highlights ───────────────────────────────────────────────── */}
      <YearContent data={data} />
    </div>
  );
}
