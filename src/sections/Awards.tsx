"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    id: 1,
    title: "Frontend Developer Certification",
    titleKo: "프론트엔드 개발자 인증",
    organization: "SChoice Hapsida Co., Ltd.",
    year: "2026",
    description:
      "Completed an intensive Frontend Developer program focused on modern web development, responsive UI implementation, and real-world project development using JavaScript and frontend technologies.",
    descriptionKo:
      "프론트엔드 개발자 인증 프로그램을 완료하여 현대적인 웹 개발, 반응형 UI 구현 및 실제 프로젝트 개발 능력을 향상시켰습니다.",
  },
  {
    id: 2,
    title: "NEORDINARY x Spoon OS Hackathon 3rd Place",
    titleKo: "NEORDINARY x Spoon OS 해커톤 3위",
    organization: "NEORDINARY & Spoon OS",
    year: "2025",
    description:
      "Secured 3rd place out of 10+ teams in a competitive hackathon",
    descriptionKo:
      "경쟁이 치열한 해커톤에서 10개 이상의 팀 중 3위를 차지했습니다.",
  },
  {
    id: 3,
    title: "CS50: Web Programming with Python and JavaScript",
    titleKo: "CS50: 파이썬과 JavaScript로 배우는 웹 프로그래밍",
    organization: "Harvard University",
    year: "2025",
    description:
      "Completed Harvard’s advanced web development program focused on full-stack application development using Python, JavaScript, Django, databases, APIs, and modern web technologies.",
    descriptionKo:
      "하버드 대학교의 고급 웹 개발 프로그램을 완료하여 전체 스택 애플리케이션 개발 능력을 향상시켰습니다.",
  },
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

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
          title={t("awards.title")}
          subtitle={t("awards.subtitle")}
        />

        <div className="space-y-0">
          {awards.map((award, index) => (
            <div
              key={award.id}
              className="award-row group relative border-t border-border py-8 md:py-12 cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-fg-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                    {lang === "ko" ? award.titleKo : award.title}
                  </h3>
                </div>

                <div className="md:col-span-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="font-mono text-sm uppercase tracking-wider text-fg-muted">
                      {award.organization}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <span className="font-mono text-sm text-fg-muted">
                    {award.year}
                  </span>
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-fg/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:text-bg transition-colors" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mt-0 md:mt-0 overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
                <div className="md:col-start-2 md:col-span-6">
                  <p className="text-fg-muted pt-4">
                    {lang === "ko" ? award.descriptionKo : award.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border" />
      </div>
    </section>
  );
}
