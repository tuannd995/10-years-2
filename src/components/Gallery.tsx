"use client";

import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/years";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="gallery-panel relative flex h-screen w-[250vw] flex-shrink-0 items-center bg-[#0A0A0A]"
    >
      {/* Section label */}
      <div className="absolute left-10 top-10 z-10 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A96E]" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#C9A96E] uppercase">
          A Decade in Frames
        </span>
      </div>

      {/* Images strip */}
      <div className="flex h-full items-end gap-5 px-28 pb-20 pt-24">
        {GALLERY_IMAGES.map((img, i) => {
          const isTall = i % 3 === 1;
          return (
            <div
              key={i}
              className="gallery-item group relative flex-shrink-0 overflow-hidden"
              style={{
                width: isTall ? "420px" : "320px",
                height: isTall ? "68vh" : "52vh",
              }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="420px"
                className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-4 left-5 right-5">
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/55 uppercase">
                  {img.caption}
                </p>
              </div>

              {/* Index */}
              <div className="absolute right-4 top-4">
                <span className="font-mono text-xs text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Left + right edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
    </section>
  );
}
