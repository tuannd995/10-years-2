"use client";

import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/years";

/**
 * Gallery — Phase 1 horizontal panel (200vw).
 *
 * Cinematic horizontal image strip. Images vary in height and alignment
 * to create a dynamic, editorial feel as the user scrolls through.
 */
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="gallery-panel relative flex h-screen w-[200vw] shrink-0 items-center bg-[#0A0A0A]"
    >
      {/* Section label */}
      <div className="absolute left-10 top-10 z-10 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A96E]" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#C9A96E] uppercase">
          A Decade in Frames
        </span>
      </div>

      {/* Images strip */}
      <div className="flex h-full items-end gap-4 px-28 pb-16 pt-20">
        {GALLERY_IMAGES.map((img, i) => {
          // Alternate tall / medium / short heights for cinematic rhythm
          const heights = ["72vh", "56vh", "65vh", "58vh", "74vh", "52vh"];
          const widths  = ["340px", "480px", "360px", "440px", "300px", "400px"];

          return (
            <div
              key={i}
              className="gallery-item group relative shrink-0 overflow-hidden"
              style={{
                width: widths[i % widths.length],
                height: heights[i % heights.length],
              }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="480px"
                className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-4 left-5">
                <p className="font-mono text-[9px] tracking-[0.35em] text-white/55 uppercase">
                  {img.caption}
                </p>
              </div>

              {/* Index */}
              <div className="absolute right-4 top-4">
                <span className="font-mono text-xs text-white/22">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-[#0A0A0A] to-transparent" />
    </section>
  );
}
