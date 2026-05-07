"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        element.querySelector(".section-number"),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          element.querySelector(".section-title"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          element.querySelector(".section-subtitle"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <div className="flex items-center gap-4 mb-4">
        <span className="section-number font-mono text-sm text-accent">
          {number}
        </span>
        <div className="h-px w-12 bg-accent/30" />
      </div>
      <h2 className="section-title font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
        {title}
      </h2>
      {subtitle && (
        <p className="section-subtitle mt-6 text-fg-muted text-lg md:text-xl max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
