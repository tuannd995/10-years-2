"use client";

export default function EndingSection() {
  return (
    <section
      id="ending"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, #1a1208 0%, #0a0a0a 70%)",
        }}
      />

      {/* Animated ring */}
      <div
        className="ending-ring pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full border border-[#C9A96E]/10"
        style={{ animation: "pulse-ring 4s ease-in-out infinite" }}
      />
      <div
        className="ending-ring pointer-events-none absolute h-[80vmin] w-[80vmin] rounded-full border border-[#C9A96E]/05"
        style={{ animation: "pulse-ring 4s ease-in-out infinite 1s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C9A96E]/50" />
          <span className="font-mono text-xs tracking-[0.5em] text-[#C9A96E] uppercase">
            2016 — 2025
          </span>
          <span className="h-px w-10 bg-[#C9A96E]/50" />
        </div>

        {/* Main heading */}
        <h2 className="ending-title font-serif text-[clamp(3rem,9vw,8rem)] font-light leading-none tracking-tight text-white">
          Thank You
        </h2>
        <h2 className="ending-title font-serif text-[clamp(3rem,9vw,8rem)] font-light italic leading-none tracking-tight text-[#C9A96E]">
          for 10 Years.
        </h2>

        {/* Subline */}
        <p className="mt-8 max-w-lg text-base leading-relaxed text-white/40">
          To our team, our clients, and everyone who believed in us along the
          way — this decade belongs to you.
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-24 bg-[#C9A96E]/30" />

        {/* Stats row */}
        <div className="flex items-center gap-12">
          {[
            { value: "10", label: "Years" },
            { value: "150+", label: "Team" },
            { value: "1M+", label: "Users" },
            { value: "40+", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-3xl font-light text-[#C9A96E]">
                {s.value}
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#hero"
          className="mt-14 flex items-center gap-3 border border-[#C9A96E]/30 px-8 py-4 font-mono text-xs tracking-[0.3em] text-[#C9A96E] uppercase transition-colors hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/5"
        >
          Back to the beginning
          <span className="ml-1">↑</span>
        </a>
      </div>

      {/* Bottom wordmark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="font-mono text-[9px] tracking-[0.5em] text-white/10 uppercase">
          Est. 2016 · A Story Still Being Written
        </p>
      </div>
    </section>
  );
}
