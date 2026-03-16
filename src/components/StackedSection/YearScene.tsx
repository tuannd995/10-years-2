"use client";

import Image from "next/image";
import { YearData, YEARS } from "@/data/years";
import YearContent from "./YearContent";

interface YearSceneProps {
  data: YearData;
  index: number;
}

/**
 * YearScene — one complete year block.
 *
 * Poster List View (h-screen, overflow:hidden = "gallery wall window"):
 *   - Strip of all 10 poster cards, horizontally arranged.
 *   - Active poster has white frame + shadow (poster-frame class).
 *   - GSAP animates:
 *       A. strip.x  → slides active poster from right-of-center → center
 *       B. poster.scale + poster.y → zooms up, top aligns with viewport top
 *       C. poster.y → scrolls poster upward until exits top
 *
 * Year Content (normal flow below):
 *   - Revealed after poster exits top.
 */
export default function YearScene({ data, index }: YearSceneProps) {
  /**
   * Poster card CSS dimensions (NOT including frame box-shadow — box-shadow
   * doesn't affect offsetWidth, so GSAP measurements remain accurate).
   *
   * The "frame" is applied via CSS class .poster-frame (see globals.css):
   *   box-shadow: 0 0 0 8px #fff, 0 0 0 9px rgba(0,0,0,0.06), 0 20px 60px ...
   */
  const POSTER_W = 300; // px
  const POSTER_H = 450; // px — 2:3 portrait ratio
  const POSTER_GAP = 56; // px gap between cards

  return (
    <div
      id={`year-scene-${data.year}`}
      className="year-scene relative w-full"
      data-year={data.year}
      data-index={index}
    >
      {/* ── Poster List View ──────────────────────────────────────────────── */}
      {/*
        overflow: hidden creates the "gallery wall window".
        The strip extends far beyond viewport edges; only posters near the
        centre are visible, giving the cinematic film-reel effect.
        NO overflow-hidden needed for the zoom direction (poster grows upward,
        which is outside the top of this div — also clipped, which is OK
        because container is pinned and we scroll the poster out of the top).
      */}
      <div
        id={`poster-list-${data.year}`}
        className="poster-list-view relative h-screen w-full overflow-hidden"
        style={{ backgroundColor: "#F0EBE3" }}  /* warm cream "wall" */
      >
        {/* Subtle wall texture dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #8B7355 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ghost year number */}
        <div
          className="year-ghost pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span
            className="font-serif font-light leading-none"
            style={{
              fontSize: "clamp(8rem,22vw,20rem)",
              color: `${data.color}0A`,
            }}
          >
            {data.year}
          </span>
        </div>

        {/* ── Poster strip ─────────────────────────────────────────────── */}
        {/*
          position:absolute; top:50% — GSAP sets yPercent:-50 and x.
          The strip has no overflow constraint; clipping happens at the
          poster-list-view level.
        */}
        <div
          id={`poster-strip-${data.year}`}
          className="poster-strip absolute top-1/2 flex items-stretch"
          style={{ gap: POSTER_GAP }}
          data-active-index={index}
          data-poster-w={POSTER_W}
          data-poster-h={POSTER_H}
          data-poster-gap={POSTER_GAP}
        >
          {YEARS.map((y, j) => {
            const isActive = j === index;
            const dist = Math.abs(j - index);
            const isPast = j < index;

            return (
              <div
                key={y.year}
                id={isActive ? `poster-card-${data.year}` : undefined}
                className={`poster-strip-item relative shrink-0 overflow-hidden${isActive ? " poster-frame" : ""}`}
                style={{
                  width: POSTER_W,
                  height: POSTER_H,
                  opacity: isActive ? 1 : Math.max(0.20, 0.70 - dist * 0.12),
                  transformOrigin: "50% 0",      // ← zoom from TOP CENTER
                  willChange: isActive ? "transform" : undefined,
                  filter: isPast
                    ? "grayscale(30%) brightness(0.92)"
                    : !isActive
                    ? "brightness(0.96)"
                    : "none",
                }}
              >
                <Image
                  src={y.posterImage}
                  alt={`${y.year} — ${y.tagline}`}
                  fill
                  sizes={`${POSTER_W}px`}
                  className="object-cover"
                  priority={isActive && index === 0}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

                {/* Year + tagline */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p
                    className="font-mono text-[8px] tracking-[0.4em] uppercase"
                    style={{ color: isActive ? `${y.color}dd` : "rgba(255,255,255,0.4)" }}
                  >
                    {y.year}
                  </p>
                  {isActive && (
                    <h3 className="mt-0.5 font-serif text-lg font-light leading-snug text-white">
                      {data.tagline}
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Left/right edge fades — reinforce "window" effect */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-linear-to-r from-[#F0EBE3] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-linear-to-l from-[#F0EBE3] to-transparent" />

        {/* Year index — top right */}
        <div className="absolute right-10 top-10 z-10">
          <span className="font-mono text-xs text-[#1A2544]/30">
            {String(index + 1).padStart(2, "0")} / 10
          </span>
        </div>

        {/* Scroll hint — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-mono text-[8px] tracking-[0.45em] text-[#1A2544]/30 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-linear-to-b from-[#1A2544]/30 to-transparent" />
        </div>
      </div>

      {/* ── Year content ─────────────────────────────────────────────────── */}
      <YearContent data={data} />
    </div>
  );
}
