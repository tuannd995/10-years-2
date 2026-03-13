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
          className="founder-message relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
          data-index={i}
        >
          {/* Decorative side accent */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-1"
            style={{
              background: `linear-gradient(to bottom, transparent, #C9A96E, transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-8 text-center">
            {/* Opening quote mark */}
            <div className="mb-6 font-serif text-[5rem] leading-none text-[#C9A96E]/20 select-none">
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote className="founder-quote font-serif text-[clamp(1.4rem,3vw,2.25rem)] font-light italic leading-snug text-white">
              {msg.quote}
            </blockquote>

            {/* Body */}
            <p className="founder-body mt-8 max-w-xl text-base leading-relaxed text-white/50">
              {msg.body}
            </p>

            {/* Author */}
            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#C9A96E]/30">
                <Image
                  src={msg.avatar}
                  alt={msg.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{msg.author}</p>
                <p className="font-mono text-[10px] tracking-widest text-[#C9A96E] uppercase">
                  {msg.role}
                </p>
              </div>
            </div>
          </div>

          {/* Page number */}
          <div className="absolute bottom-8 right-10">
            <span className="font-mono text-xs text-white/15">
              {String(i + 1).padStart(2, "0")} / {String(FOUNDER_MESSAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
