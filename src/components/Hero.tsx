"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-panel relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-[#EEF2F8]"
    >
      {/* Subtle radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 45%, #dbe8f8 0%, #eef2f8 65%)",
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1B5BC4 1px, transparent 1px), linear-gradient(90deg, #1B5BC4 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top-left breadcrumb */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <span className="h-px w-10 bg-[#1B5BC4]" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#1B5BC4] uppercase">
          2016 — 2025
        </span>
      </div>

      {/* Main content */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center">
        <p className="hero-eyebrow mb-5 font-mono text-[10px] tracking-[0.5em] text-[#1B5BC4] uppercase">
          Ten Years of Building
        </p>

        <h1 className="hero-title leading-none">
          <span className="block font-serif text-[clamp(3.5rem,10vw,10rem)] font-light tracking-tight text-[#1A2544]">
            A Decade
          </span>
          <span className="block font-serif text-[clamp(3.5rem,10vw,10rem)] font-light italic tracking-tight text-[#1B5BC4]">
            Remembered.
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-md text-base leading-relaxed text-[#637196]">
          A cinematic journey through ten years of craft, community, and
          relentless progress.
        </p>

        <div className="hero-cta mt-14 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#1B5BC4]/50 uppercase">
            Scroll to explore
          </span>
          <div className="scroll-arrow h-12 w-px bg-linear-to-b from-[#1B5BC4]/40 to-transparent" />
        </div>
      </div>

      {/* Bottom-right stamp */}
      <div className="absolute bottom-10 right-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#1A2544]/20 uppercase">
          Est. 2016
        </p>
      </div>
    </section>
  );
}
