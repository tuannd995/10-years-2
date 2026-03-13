"use client";

import Image from "next/image";
import { YearData } from "@/data/years";
import YearContent from "./YearContent";

interface YearSceneProps {
  data: YearData;
  index: number;
}

/**
 * One complete year scene:
 *   [timeline row]  →  [poster zoom]  →  [poster scroll]  →  [year content]
 *
 * The GSAP animation engine (in StackedSection/index.tsx) wires up the
 * scroll-triggered behaviour. This component provides the DOM structure and
 * data-* attributes that the animation engine targets.
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
        This full-viewport section shows the horizontal year timeline with
        the current year's poster centred. GSAP will pin this then zoom the
        poster.
      */}
      <div
        id={`timeline-view-${data.year}`}
        className="timeline-view relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
      >
        {/* Year label — large behind poster */}
        <div
          className="pointer-events-none absolute font-mono text-[clamp(8rem,20vw,18rem)] font-black leading-none select-none"
          style={{ color: `${data.color}08` }}
        >
          {data.year}
        </div>

        {/* Horizontal poster strip */}
        <div className="poster-strip relative z-10 flex items-center gap-8">
          {/* Poster card */}
          <div
            id={`poster-${data.year}`}
            className="poster-card relative overflow-hidden"
            style={{
              /*
               * Initial size: roughly 1/3 viewport height, 2:3 aspect ratio.
               * GSAP will scale this up until width === 100vw.
               */
              width: "clamp(140px, 20vw, 260px)",
              height: "clamp(210px, 30vw, 390px)",
              transformOrigin: "center center",
            }}
          >
            <Image
              src={data.posterImage}
              alt={`${data.year} poster`}
              fill
              sizes="(max-width: 768px) 40vw, 260px"
              className="object-cover"
              priority={index === 0}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            {/* Year + tagline overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
                {data.year}
              </p>
              <h2 className="mt-1 font-serif text-xl font-light text-white">
                {data.tagline}
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      {/* ── Year content (highlights) ─────────────────────────────────────── */}
      <YearContent data={data} />
    </div>
  );
}
