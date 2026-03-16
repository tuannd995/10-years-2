"use client";

export default function EndingSection() {
  return (
    <section
      id="ending"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1B5BC4]"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, #1448A0 0%, #1B5BC4 70%)",
        }}
      />

      {/* Animated rings */}
      <div
        className="pointer-events-none absolute h-[55vmin] w-[55vmin] rounded-full border border-white/10"
        style={{ animation: "pulse-ring 4s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute h-[75vmin] w-[75vmin] rounded-full border border-white/05"
        style={{ animation: "pulse-ring 4s ease-in-out infinite 1.2s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.5em] text-white/60 uppercase">
            2016 — 2025
          </span>
          <span className="h-px w-10 bg-white/30" />
        </div>

        {/* Heading */}
        <h2 className="ending-title font-serif text-[clamp(3rem,9vw,8rem)] font-light leading-none tracking-tight text-white">
          Thank You
        </h2>
        <h2 className="ending-title font-serif text-[clamp(3rem,9vw,8rem)] font-light italic leading-none tracking-tight text-white/70">
          for 10 Years.
        </h2>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-white/50">
          To our team, our clients, and everyone who believed in us along the
          way — this decade belongs to you.
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-24 bg-white/25" />

        {/* Stats */}
        <div className="flex items-center gap-12">
          {[
            { value: "10",   label: "Years"   },
            { value: "150+", label: "Team"    },
            { value: "1M+",  label: "Users"   },
            { value: "40+",  label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-3xl font-light text-white">
                {s.value}
              </span>
              <span className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <a
          href="#hero"
          className="mt-14 flex items-center gap-3 border border-white/25 px-8 py-4 font-mono text-xs tracking-[0.3em] text-white/70 uppercase transition-all hover:border-white/50 hover:text-white"
        >
          Back to the beginning
          <span>↑</span>
        </a>
      </div>

      {/* Bottom wordmark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="font-mono text-[9px] tracking-[0.5em] text-white/20 uppercase">
          Est. 2016 · A Story Still Being Written
        </p>
      </div>
    </section>
  );
}
