"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    if (!section || !text || !image) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        text.querySelectorAll(".hero-line"),
        { y: 100, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
        .fromTo(
          text.querySelector(".hero-desc"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          image,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
          "-=1",
        );

      gsap.to(text, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(image, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute top-20 right-10 opacity-10">
        <div className="w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <div className="w-96 h-96 rounded-full bg-accent-light blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref={textRef} className="relative z-10">
          <div className="overflow-hidden mb-2">
            <p className="hero-line font-mono text-sm uppercase tracking-widest text-accent">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85]">
              Rustam
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85] text-fg-muted">
              Bakhtiyorov
            </h1>
          </div>

          <div className="hero-desc mt-8 max-w-md">
            <p className="text-lg md:text-xl text-fg-muted leading-relaxed">
              {t("hero.desc")}
            </p>
          </div>

          <div className="hero-desc mt-10 flex items-center gap-6">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-fg text-bg font-mono text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all hover:pr-12"
              data-cursor-text="View"
            >
              <span className="relative z-10">{t("hero.cta.work")}</span>
              <ArrowDown className="relative z-10 w-4 h-4 transition-transform group-hover:translate-y-1" />
              <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="font-mono text-sm uppercase tracking-wider text-fg-muted hover:text-fg transition-colors underline underline-offset-4"
            >
              {t("hero.cta.contact")}
            </a>
          </div>
        </div>

        <div ref={imageRef} className="relative lg:h-[600px] h-[400px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-fg-muted/20 to-fg-muted/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-fg-muted/20 flex items-center justify-center">
                  <span className="font-display text-6xl text-fg-muted/40">
                    JD
                  </span>
                </div>
                <p className="font-mono text-sm text-fg-muted">
                  Your Photo Here
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-bg-secondary border border-border rounded-2xl p-6 shadow-xl">
            <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-1">
              {t("hero.experience")}
            </p>
            <p className="font-display text-3xl font-bold">{t("hero.years")}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
          Scroll
        </span>
        <div className="w-px h-12 bg-fg-muted/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
