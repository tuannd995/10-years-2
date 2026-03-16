"use client";

/**
 * YearMoments — DOM structure only.
 * All GSAP/ScrollTrigger logic lives in ScrollEngine (single-context rule).
 *
 * Lightbox (photos + videos):
 *   Clicking any stack card opens a full-screen lightbox with:
 *   - Left  60% : large image or embedded YouTube video
 *   - Right 40% : metadata (date, location, event, description)
 *   - Arrow navigation + counter
 *   - Keyboard: ← → Escape
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { YearData } from "@/data/years";

export const PHOTO_W = 500;
export const PHOTO_H = 375;

export default function YearMoments({ data }: { data: YearData }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const moments = data.moments;

  // ── Keyboard navigation ────────────────────────────────────────────────
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevPhoto = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : null)), []);

  const nextPhoto = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? Math.min(moments.length - 1, i + 1) : null)), [moments.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowLeft")   prevPhoto();
      if (e.key === "ArrowRight")  nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    // Prevent page scroll while lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  const activeMoment = lightboxIndex !== null ? moments[lightboxIndex] : null;

  return (
    <>
      {/* ── Stack gallery section ─────────────────────────────────────── */}
      <div
        id={`gallery-${data.year}`}
        className="relative flex h-screen w-full overflow-hidden"
        style={{ backgroundColor: "#18120E" }}
      >
        {/* Left: Metadata panel */}
        <div className="relative z-10 flex w-[40%] shrink-0 flex-col justify-center px-14 py-16">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-6" style={{ backgroundColor: data.color }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.45em]" style={{ color: data.color }}>
              Moments · {data.year}
            </span>
          </div>

          {/* Animated metadata wrapper — updated by ScrollEngine */}
          <div className="gallery-meta-wrapper flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <svg className="h-3 w-3 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="gallery-meta-date font-mono text-[10px] tracking-widest text-white/40">
                {moments[0]?.date}
              </span>
              <span className="text-white/20">·</span>
              <svg className="h-3 w-3 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="gallery-meta-location font-mono text-[10px] tracking-widest text-white/40">
                {moments[0]?.location}
              </span>
            </div>

            <h3 className="gallery-meta-event font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-tight text-white">
              {moments[0]?.event}
            </h3>
            <div className="h-px w-8" style={{ backgroundColor: data.color, opacity: 0.5 }} />
            <p className="gallery-meta-description max-w-xs text-[13px] leading-relaxed text-white/45">
              {moments[0]?.description}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-12 left-14">
            <span className="gallery-meta-counter font-mono text-[2.8rem] font-light leading-none text-white/10">
              01 / {String(moments.length).padStart(2, "0")}
            </span>
          </div>

          {/* Click-to-expand hint */}
          <div className="absolute bottom-14 right-0 flex -rotate-90 items-center gap-2">
            <span className="h-px w-8 bg-white/15" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/25">scroll</span>
          </div>
        </div>

        {/* Right: Photo stack */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Atmospheric glow */}
          <div
            className="pointer-events-none absolute rounded-full opacity-20 blur-3xl"
            style={{ width: PHOTO_W * 1.2, height: PHOTO_H * 1.2, backgroundColor: data.color }}
          />

          <div className="relative" style={{ width: PHOTO_W, height: PHOTO_H, overflow: "visible" }}>
            {moments.map((m, i) => (
              <div
                key={i}
                className={`stack-item-${data.year} absolute top-0 left-0 cursor-pointer overflow-hidden`}
                style={{
                  width: PHOTO_W,
                  height: PHOTO_H,
                  boxShadow: "0 0 0 10px #fff, 0 0 0 11px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.65)",
                  borderRadius: 2,
                }}
                onClick={() => setLightboxIndex(i)}
                data-cursor="view"
              >
                <Image src={m.src} alt={m.event} fill sizes={`${PHOTO_W}px`} className="object-cover" priority={i < 3} />
                <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.18) 100%)" }} />

                {/* Video badge */}
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm">
                      <svg className="ml-1 h-6 w-6 text-[#18120E]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 right-12 font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">
          {data.year} — Moments
        </div>
      </div>

      {/* ── Lightbox overlay ──────────────────────────────────────────────── */}
      {lightboxIndex !== null && activeMoment && (
        <div
          className="fixed inset-0 z-[500] flex items-stretch"
          style={{ backgroundColor: "rgba(14,10,8,0.96)" }}
          onClick={closeLightbox}
        >
          {/* ── Media (left) ─────────────────────────────────────────── */}
          <div
            className="relative flex flex-[3] items-center justify-center p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {activeMoment.type === "video" && activeMoment.videoId ? (
              <div className="relative w-full overflow-hidden rounded-lg shadow-2xl" style={{ aspectRatio: "16/9" }}>
                <iframe
                  key={activeMoment.videoId}
                  src={`https://www.youtube.com/embed/${activeMoment.videoId}?autoplay=1&rel=0`}
                  allow="autoplay; fullscreen"
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="relative max-h-full max-w-full overflow-hidden rounded-sm shadow-2xl"
                style={{ boxShadow: "0 0 0 10px #fff, 0 0 0 11px rgba(255,255,255,0.08), 0 40px 100px rgba(0,0,0,0.8)" }}
              >
                <Image
                  src={activeMoment.src}
                  alt={activeMoment.event}
                  width={900}
                  height={675}
                  className="block max-h-[80vh] w-auto object-contain"
                  priority
                />
              </div>
            )}

            {/* Prev / Next arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              disabled={lightboxIndex === 0}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white disabled:opacity-20"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              disabled={lightboxIndex === moments.length - 1}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white disabled:opacity-20"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ── Metadata (right) ─────────────────────────────────────── */}
          <div
            className="flex w-[340px] shrink-0 flex-col justify-center border-l border-white/8 px-10 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Year + section label */}
            <div className="mb-8 flex items-center gap-2">
              <span className="h-px w-5" style={{ backgroundColor: data.color }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: data.color }}>
                {data.year} · Moments
              </span>
            </div>

            {/* Date + location */}
            <div className="mb-5 flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-widest text-white/40">
                {activeMoment.date}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-white/30">
                {activeMoment.location}
              </span>
            </div>

            {/* Event title */}
            <h2 className="mb-4 font-serif text-[clamp(1.4rem,2.2vw,2rem)] font-light leading-snug text-white">
              {activeMoment.event}
            </h2>

            <div className="mb-6 h-px w-8" style={{ backgroundColor: data.color, opacity: 0.4 }} />

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-white/50">
              {activeMoment.description}
            </p>

            {/* Counter */}
            <div className="mt-auto pt-12">
              <span className="font-mono text-[3rem] font-light leading-none text-white/10">
                {String(lightboxIndex + 1).padStart(2, "0")}
                <span className="text-[1.5rem]"> / {String(moments.length).padStart(2, "0")}</span>
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
