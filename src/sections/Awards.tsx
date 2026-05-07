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
    title: "Site of the Day",
    titleKo: "오늘의 사이트",
    organization: "Awwwards",
    year: "2024",
    description:
      "Recognized for exceptional design and user experience in web development.",
    descriptionKo:
      "웹 개발에서 뛰어난 디자인과 사용자 경험으로 인정받았습니다.",
  },
  {
    id: 2,
    title: "Developer 30 Under 30",
    titleKo: "30세 이하 개발자 30인",
    organization: "Forbes",
    year: "2023",
    description:
      "Featured among the top young developers shaping the future of technology.",
    descriptionKo:
      "기술의 미래를 형성하는 최고의 젊은 개발자들 중 한 명으로 선정되었습니다.",
  },
  {
    id: 3,
    title: "Best Innovation",
    titleKo: "최고의 혁신상",
    organization: "CSS Design Awards",
    year: "2024",
    description:
      "Awarded for pushing the boundaries of creative web development.",
    descriptionKo: "창의적인 웹 개발의 한계를 뛰어넘은 공로로 수상했습니다.",
  },
  {
    id: 4,
    title: "Open Source Champion",
    titleKo: "오픈소스 챔피언",
    organization: "GitHub",
    year: "2023",
    description:
      "Recognized for significant contributions to the open-source community.",
    descriptionKo: "오픈소스 커뮤니티에 대한 중요한 기여로 인정받았습니다.",
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
