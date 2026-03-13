"use client";

import Image from "next/image";
import { YearData } from "@/data/years";

interface YearContentProps {
  data: YearData;
}

export default function YearContent({ data }: YearContentProps) {
  return (
    <div
      id={`content-${data.year}`}
      className="year-content relative w-full"
      data-year={data.year}
    >
      {data.highlights.map((h, i) => (
        <div
          key={i}
          className="year-highlight relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
        >
          {/* Background image */}
          {h.image && (
            <>
              <Image
                src={h.image}
                alt={h.title}
                fill
                sizes="100vw"
                className="object-cover opacity-20"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
            </>
          )}

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-8 text-center">
            {/* Stat badge */}
            {h.stat && (
              <div className="flex flex-col items-center">
                <span
                  className="font-serif text-[clamp(3rem,8vw,6rem)] font-light leading-none"
                  style={{ color: data.color }}
                >
                  {h.stat.value}
                </span>
                <span className="mt-1 font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
                  {h.stat.label}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-serif text-[clamp(1.5rem,4vw,3rem)] font-light text-white">
              {h.title}
            </h3>

            {/* Divider */}
            <span className="h-px w-12" style={{ backgroundColor: data.color }} />

            {/* Body */}
            <p className="max-w-md text-base leading-relaxed text-white/60">
              {h.body}
            </p>
          </div>

          {/* Year watermark */}
          <div className="pointer-events-none absolute bottom-8 right-8 font-mono text-[clamp(4rem,12vw,10rem)] font-bold leading-none text-white/[0.03] select-none">
            {data.year}
          </div>
        </div>
      ))}
    </div>
  );
}
