"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "GSAP", icon: "🎬" },
      { name: "Three.js", icon: "🔷" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "GraphQL", icon: "◈" },
      { name: "Redis", icon: "🔴" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", icon: "🔀" },
      { name: "Docker", icon: "🐳" },
      { name: "Figma", icon: "🎯" },
      { name: "Vercel", icon: "▲" },
      { name: "AWS", icon: "☁️" },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(".tech-card");

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="02"
          title="Tech Stack"
          subtitle="A curated selection of tools and technologies I use to bring ideas to life"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((category, catIndex) => (
            <ScrollReveal key={category.name} delay={catIndex * 0.1}>
              <div className="tech-card group relative bg-fg/[0.02] border border-fg/5 rounded-3xl p-8 hover:border-accent/20 transition-all duration-500">
                <h3 className="font-mono text-sm uppercase tracking-widest text-fg-muted mb-8">
                  {category.name}
                </h3>

                <div className="space-y-4">
                  {category.items.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-4 p-4 rounded-xl bg-bg/50 hover:bg-accent/5 transition-colors duration-300 group/item"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-2xl w-10 h-10 flex items-center justify-center bg-fg/5 rounded-lg">
                        {tech.icon}
                      </span>
                      <span className="font-display text-lg font-medium group-hover/item:text-accent transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
