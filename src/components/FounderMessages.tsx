"use client";

import Image from "next/image";
import { FOUNDER_MESSAGES } from "@/data/years";

export default function FounderMessages() {
  return (
    <section id="founder-messages" className="relative w-full">
      {FOUNDER_MESSAGES.map((msg, i) => (
        <div
          key={i}
          id={`founder-msg-${i}`}
          className="founder-message relative flex h-screen w-full items-center justify-center overflow-hidden bg-white"
          data-index={i}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 h-full w-1"
            style={{
              background: "linear-gradient(to bottom, transparent, #1B5BC4 30%, #1B5BC4 70%, transparent)",
            }}
          />

          {/* Subtle background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(#1B5BC4 1px, transparent 1px), linear-gradient(90deg, #1B5BC4 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-8 text-center">
            {/* Opening quote mark */}
            <div className="mb-4 font-serif text-[4.5rem] leading-none text-[#1B5BC4]/15 select-none">
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote className="founder-quote font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-snug text-[#1A2544]">
              {msg.quote}
            </blockquote>

            {/* Body */}
            <p className="founder-body mt-8 max-w-xl text-base leading-relaxed text-[#637196]">
              {msg.body}
            </p>

            {/* Author */}
            <div className="founder-author mt-10 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#1B5BC4]/20">
                <Image
                  src={msg.avatar}
                  alt={msg.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#1A2544]">{msg.author}</p>
                <p className="font-mono text-[10px] tracking-widest text-[#1B5BC4] uppercase">
                  {msg.role}
                </p>
              </div>
            </div>
          </div>

          {/* Page number */}
          <div className="absolute bottom-8 right-10">
            <span className="font-mono text-xs text-[#1A2544]/20">
              {String(i + 1).padStart(2, "0")} / {String(FOUNDER_MESSAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
