"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const ctx = gsap.context(() => {
      const statItems = stats.querySelectorAll(".stat-item");

      gsap.fromTo(
        statItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      statItems.forEach((item) => {
        const numberEl = item.querySelector(".stat-number");
        if (!numberEl) return;

        const target = parseInt(numberEl.getAttribute("data-value") || "0");

        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              const val = Math.round(this.targets()[0].val);
              numberEl.textContent = val + (target > 100 ? "+" : "");
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="01"
          title="About Me"
          subtitle="Passionate about creating digital experiences that leave lasting impressions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-fg-muted/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-fg-muted/20 flex items-center justify-center">
                    <span className="font-display text-4xl text-fg-muted/40">
                      📸
                    </span>
                  </div>
                  <p className="font-mono text-sm text-fg-muted">
                    Your Photo Here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-fg">
              I&apos;m a creative developer with a passion for building
              immersive web experiences that bridge the gap between design and
              technology. With over 5 years of experience in the industry,
              I&apos;ve had the privilege of working with startups and Fortune
              500 companies alike.
            </p>

            <p className="text-lg leading-relaxed text-fg-muted">
              My approach combines technical expertise with an eye for
              aesthetics. I believe that great software should not only function
              flawlessly but also feel intuitive and delightful to use. Every
              pixel matters, every interaction counts.
            </p>

            <p className="text-lg leading-relaxed text-fg-muted">
              When I&apos;m not coding, you&apos;ll find me exploring new design
              trends, contributing to open-source projects, or capturing moments
              through photography. I&apos;m always eager to take on new
              challenges and push the boundaries of what&apos;s possible on the
              web.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-fg/10"
            >
              {[
                { value: 50, label: "Projects", suffix: "+" },
                { value: 5, label: "Years Exp", suffix: "+" },
                { value: 30, label: "Clients", suffix: "+" },
                { value: 12, label: "Awards", suffix: "" },
              ].map((stat) => (
                <div key={stat.label} className="stat-item">
                  <p
                    className="stat-number font-display text-4xl md:text-5xl font-bold text-accent"
                    data-value={stat.value}
                  >
                    0{stat.suffix}
                  </p>
                  <p className="font-mono text-sm text-fg-muted uppercase tracking-wider mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
