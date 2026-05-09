"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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

  const stats = [
    { value: 10, label: t("about.stats.projects"), suffix: "+" },
    { value: 1, label: t("about.stats.experience"), suffix: "+" },
    { value: 15, label: t("about.stats.clients"), suffix: "+" },
    { value: 3, label: t("about.stats.awards"), suffix: "" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="01"
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
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

          <div className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-fg">
              {t("about.p1")}
            </p>

            <p className="text-lg leading-relaxed text-fg-muted">
              {t("about.p2")}
            </p>

            <p className="text-lg leading-relaxed text-fg-muted">
              {t("about.p3")}
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
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
