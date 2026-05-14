"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight, Cat, Camera } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    if (!section || !cta) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cta.querySelector(".cta-text"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const footer = section.querySelector(".footer-content");
      if (footer) {
        gsap.fromTo(
          footer,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.stack"), href: "#stack" },
    { label: t("nav.work"), href: "#projects" },
    { label: t("nav.awards"), href: "#awards" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ctaRef} className="text-center mb-32">
          <p className="font-mono text-sm uppercase tracking-widest text-accent mb-8">
            {t("contact.subtitle")}
          </p>

          <h2 className="cta-text font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-12">
            {t("contact.title1")}
            <br />
            <span className="text-fg-muted">{t("contact.title2")}</span>
            <br />
            {t("contact.title3")}
          </h2>

          <MagneticButton
            href="mailto:rust.workspace4@gmail.com"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-fg text-bg rounded-full font-mono text-lg uppercase tracking-wider hover:bg-accent transition-colors duration-300"
            strength={0.2}
          >
            <Mail className="w-5 h-5" />
            <span>{t("contact.cta")}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>

        <div className="footer-content border-t border-border pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <p className="font-display text-2xl font-bold mb-4">Rustam</p>
              <p className="text-fg-muted leading-relaxed">
                {t("contact.brand")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
                  {t("contact.nav.title")}
                </p>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-fg-muted hover:text-fg transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
                  {t("contact.social.title")}
                </p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://github.com/rust4work"
                      target="_blank"
                      className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
                    >
                      <Cat className="w-4 h-4" />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/rxstvm/"
                      target="_blank"
                      className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full border border-fg/20 flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:text-bg transition-colors" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                  {t("contact.backtotop")}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-fg-muted">
              © 2026 Rustam. {t("contact.copyright")}
            </p>
            <p className="font-mono text-xs text-fg-muted">
              {t("contact.builtwith")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
