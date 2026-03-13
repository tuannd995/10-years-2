"use client";

import Image from "next/image";
import { YEARS } from "@/data/years";

/**
 * StackedEntry — the 3rd and final horizontal panel (100vw).
 *
 * Visible when horizontal scroll completes. Shows the complete poster
 * film strip of all 10 years, with year 2016 largest and leading the
 * visual hierarchy. Acts as a "chapter title card" bridging Phase 1
 * (horizontal) and Phase 2 (vertical year stories).
 */
export default function StackedEntry() {
  return (
    <section
      id="stacked-entry"
      className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, #120f08 0%, #0a0a0a 65%)",
        }}
      />

      {/* Section label */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A96E]" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#C9A96E] uppercase">
          A Decade in Stories
        </span>
      </div>

      {/* Heading */}
      <div className="relative z-10 mb-10 flex flex-col items-center text-center">
        <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-tight text-white">
          Ten Years.
        </h2>
        <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light italic leading-tight text-[#C9A96E]">
          One Story.
        </h2>
        <p className="mt-4 font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
          2016 — 2025
        </p>
      </div>

      {/* ── Poster film strip ─────────────────────────────────────────── */}
      {/*
        10 year posters laid out horizontally.
        First year (2016) is tallest and most prominent — it will be the
        first poster zoomed in StackedSection Phase 2.
        Scale decreases with each subsequent year for a film-strip depth effect.
      */}
      <div className="relative z-10 flex items-end justify-center gap-[6px] px-12">
        {YEARS.map((y, i) => {
          // Taper: 2016 (i=0) is largest, each subsequent year is slightly smaller
          const scale = Math.max(0.42, 1 - i * 0.063);
          const opacity = Math.max(0.28, 1 - i * 0.072);
          const w = Math.round(scale * 108);
          const h = Math.round(scale * 162); // 2:3 portrait ratio

          return (
            <div
              key={y.year}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: w,
                height: h,
                opacity,
                // Subtle bottom-alignment creates a "rising" visual rhythm
                marginBottom: `${i * 2}px`,
              }}
            >
              <Image
                src={y.posterImage}
                alt={String(y.year)}
                fill
                sizes={`${w}px`}
                className="object-cover"
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

              {/* Year label */}
              <p className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[7px] tracking-widest text-white/50">
                {y.year}
              </p>
            </div>
          );
        })}
      </div>

      {/* Timeline dots row */}
      <div className="relative z-10 mt-6 flex items-center gap-[10px]">
        {YEARS.map((y, i) => (
          <div
            key={y.year}
            className="rounded-full transition-all"
            style={{
              width: i === 0 ? 8 : 5,
              height: i === 0 ? 8 : 5,
              backgroundColor:
                i === 0 ? y.color : "rgba(255,255,255,0.18)",
              boxShadow: i === 0 ? `0 0 10px ${y.color}99` : "none",
            }}
          />
        ))}
      </div>

      {/* Scroll down cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.45em] text-white/20 uppercase">
          Scroll to begin
        </span>
        <div className="h-10 w-px bg-linear-to-b from-white/25 to-transparent" />
      </div>

      {/* Right edge stamp */}
      <div className="absolute right-10 bottom-10">
        <p className="font-mono text-[9px] tracking-[0.3em] text-white/10 uppercase">
          Est. 2016
        </p>
      </div>
    </section>
  );
}
