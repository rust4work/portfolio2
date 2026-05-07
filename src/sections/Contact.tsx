"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUpRight, Cat, Bird } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    if (!section || !cta) return;

    const ctx = gsap.context(() => {
      // Scale up the CTA text on scroll
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

      // Footer reveal effect
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mb-32">
          <p className="font-mono text-sm uppercase tracking-widest text-accent mb-8">
            Let&apos;s Connect
          </p>

          <h2 className="cta-text font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-12">
            Let&apos;s Build
            <br />
            <span className="text-fg-muted">Something</span>
            <br />
            Together
          </h2>

          <MagneticButton
            href="mailto:hello@johndoe.com"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-fg text-bg rounded-full font-mono text-lg uppercase tracking-wider hover:bg-accent transition-colors duration-300"
            strength={0.2}
          >
            <Mail className="w-5 h-5" />
            <span>Get in Touch</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>

        {/* Footer */}
        <div className="footer-content border-t border-fg/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Brand */}
            <div>
              <p className="font-display text-2xl font-bold mb-4">John Doe</p>
              <p className="text-fg-muted leading-relaxed">
                Creative Developer crafting premium digital experiences with
                modern technologies.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
                  Navigation
                </p>
                <ul className="space-y-3">
                  {["About", "Stack", "Work", "Awards"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-fg-muted hover:text-fg transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
                  Social
                </p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://github.com"
                      target="_blank"
                      className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
                    >
                      <Cat className="w-4 h-4" />
                      GitHub
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
                    >
                      <Bird className="w-4 h-4" />
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Back to top */}
            <div className="flex md:justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full border border-fg/20 flex items-center justify-center group-hover:bg-fg group-hover:border-fg transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:text-bg transition-colors" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                  Back to Top
                </span>
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-fg/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-fg-muted">
              © 2024 John Doe. All rights reserved.
            </p>
            <p className="font-mono text-xs text-fg-muted">
              Built with Next.js, GSAP & lots of ☕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
