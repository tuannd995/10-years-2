"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-panel relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #1a1208 0%, #0a0a0a 70%)",
        }}
      />

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top-left year range */}
      <div className="absolute left-10 top-10 flex items-center gap-3">
        <span className="h-px w-12 bg-[#C9A96E]" />
        <span className="font-mono text-xs tracking-[0.3em] text-[#C9A96E]">
          2016 — 2025
        </span>
      </div>

      {/* Main content — visible by default, GSAP adds entrance animation */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center">
        <p className="hero-eyebrow mb-6 font-mono text-xs tracking-[0.5em] text-[#C9A96E] uppercase">
          Ten Years of Building
        </p>

        <h1 className="hero-title leading-none">
          <span className="block font-serif text-[clamp(3.5rem,10vw,10rem)] font-light tracking-tight text-white">
            A Decade
          </span>
          <span className="block font-serif text-[clamp(3.5rem,10vw,10rem)] font-light italic tracking-tight text-[#C9A96E]">
            Remembered.
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-md text-base leading-relaxed text-white/50">
          A cinematic journey through ten years of craft, community, and
          relentless progress.
        </p>

        <div className="hero-cta mt-16 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
            Scroll to explore
          </span>
          <div className="scroll-arrow h-12 w-px bg-linear-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {/* Bottom-right stamp */}
      <div className="absolute bottom-10 right-10 text-right">
        <p className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">
          Est. 2016
        </p>
      </div>
    </section>
  );
}
