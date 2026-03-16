"use client";

import Image from "next/image";
import { GALLERY_IMAGES } from "@/data/years";

export default function Gallery() {
  const heights = ["72vh", "56vh", "66vh", "58vh", "74vh", "54vh"];
  const widths  = ["340px", "460px", "360px", "420px", "300px", "400px"];

  return (
    <section
      id="gallery"
      className="gallery-panel relative flex h-screen w-[200vw] shrink-0 items-center bg-[#EEF2F8]"
    >
      {/* Section label */}
      <div className="absolute left-10 top-10 z-10 flex items-center gap-3">
        <span className="h-px w-8 bg-[#1B5BC4]" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#1B5BC4] uppercase">
          A Decade in Frames
        </span>
      </div>

      {/* Images strip */}
      <div className="flex h-full items-end gap-4 px-28 pb-16 pt-20">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="gallery-img-card gallery-item group relative shrink-0 overflow-hidden rounded-sm"
            style={{
              width:     widths[i % widths.length],
              height:    heights[i % heights.length],
              boxShadow: "0 4px 20px rgba(27,91,196,0.10), 0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <Image
              src={img.src}
              alt={img.caption}
              fill
              sizes="460px"
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
            />

            {/* Caption overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5">
              <p className="font-mono text-[9px] tracking-[0.35em] text-white/80 uppercase">
                {img.caption}
              </p>
            </div>

            {/* Index */}
            <div className="absolute right-4 top-4">
              <span className="font-mono text-xs text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-[#EEF2F8] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-[#EEF2F8] to-transparent" />
    </section>
  );
}
