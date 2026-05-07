"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    id: 1,
    title: "Site of the Day",
    organization: "Awwwards",
    year: "2024",
    description:
      "Recognized for exceptional design and user experience in web development.",
  },
  {
    id: 2,
    title: "Developer 30 Under 30",
    organization: "Forbes",
    year: "2023",
    description:
      "Featured among the top young developers shaping the future of technology.",
  },
  {
    id: 3,
    title: "Best Innovation",
    organization: "CSS Design Awards",
    year: "2024",
    description:
      "Awarded for pushing the boundaries of creative web development.",
  },
  {
    id: 4,
    title: "Open Source Champion",
    organization: "GitHub",
    year: "2023",
    description:
      "Recognized for significant contributions to the open-source community.",
  },
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".award-row");

      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
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
      id="awards"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="04"
          title="Recognition"
          subtitle="Awards and honors that validate the quality and impact of my work"
        />

        <div className="space-y-0">
          {awards.map((award, index) => (
            <ScrollReveal key={award.id} delay={index * 0.1}>
              <div className="award-row group relative border-t border-fg/10 py-8 md:py-12 cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-sm text-fg-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                      {award.title}
                    </h3>
                  </div>

                  {/* Organization */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="font-mono text-sm uppercase tracking-wider text-fg-muted">
                        {award.organization}
                      </span>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm text-fg-muted">
                      {award.year}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-2 flex justify-end">
                    <div className="w-10 h-10 rounded-full border border-fg/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 group-hover:text-bg transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Description - expands on hover */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mt-0 md:mt-0 overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                  <div className="md:col-start-2 md:col-span-6">
                    <p className="text-fg-muted pt-4">{award.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-fg/10" />
      </div>
    </section>
  );
}
