"use client";

export default function StackedEntry() {
  return (
    <section
      id="stacked-entry"
      className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-[#EEF2F8]"
    >
      {/* Subtle gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, #dce9f7 0%, #eef2f8 65%)",
        }}
      />

      {/* Chapter label */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <span className="h-px w-8 bg-[#1B5BC4]" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#1B5BC4] uppercase">
          Chapter II
        </span>
      </div>

      {/* Big background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span
          className="font-serif font-light leading-none text-[#1B5BC4]"
          style={{ fontSize: "clamp(12rem,35vw,28rem)", opacity: 0.04 }}
        >
          10
        </span>
      </div>

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-6 font-mono text-[10px] tracking-[0.5em] text-[#1B5BC4] uppercase">
          2016 — 2025
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-tight text-[#1A2544]">
          Ten Years.
        </h2>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light italic leading-tight text-[#1B5BC4]">
          One Story.
        </h2>
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#637196]">
          Scroll to relive a decade — one year at a time.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.45em] text-[#1B5BC4]/40 uppercase">
          Begin
        </span>
        <div className="h-10 w-px bg-linear-to-b from-[#1B5BC4]/40 to-transparent" />
      </div>

      <div className="absolute bottom-10 right-10">
        <p className="font-mono text-[9px] tracking-[0.3em] text-[#1A2544]/15 uppercase">
          Est. 2016
        </p>
      </div>
    </section>
  );
}
