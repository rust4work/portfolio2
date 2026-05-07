"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cat, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    titleKo: "이커머스 플랫폼",
    description:
      "A full-stack e-commerce solution with real-time inventory, AI-powered recommendations, and seamless checkout experience. Built for scale.",
    descriptionKo:
      "실시간 재고 관리, AI 기반 추천 시스템, 원활한 결제 경험을 갖춘 풀스택 이커머스 솔루션입니다. 확장성을 염두에 두고 구축되었습니다.",
    image: "/images/project1.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 2,
    title: "AI Dashboard",
    titleKo: "AI 대시보드",
    description:
      "Real-time analytics dashboard with machine learning insights. Features interactive data visualization and predictive modeling.",
    descriptionKo:
      "머신러닝 인사이트가 포함된 실시간 분석 대시보드입니다. 인터랙티브 데이터 시각화와 예측 모델링 기능을 제공합니다.",
    image: "/images/project2.jpg",
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "Social Media App",
    titleKo: "소셜 미디어 앱",
    description:
      "Mobile-first social platform with real-time messaging, stories, and content discovery. Optimized for performance and engagement.",
    descriptionKo:
      "실시간 메시징, 스토리, 콘텐츠 발견 기능을 갖춘 모바일 우선 소셜 플랫폼입니다. 성능과 참여도에 최적화되었습니다.",
    image: "/images/project3.jpg",
    tags: ["React Native", "Firebase", "Redux", "Node.js"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 4,
    title: "Design System",
    titleKo: "디자인 시스템",
    description:
      "Comprehensive component library with accessibility-first approach. Used across 12 products by a team of 40+ developers.",
    descriptionKo:
      "접근성 우선 접근 방식의 종합적인 컴포넌트 라이브러리입니다. 40명 이상의 개발자 팀이 12개 제품에서 사용하고 있습니다.",
    image: "/images/project4.jpg",
    tags: ["TypeScript", "Storybook", "Tailwind", "CI/CD"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const projectCards = section.querySelectorAll(".project-card");

      projectCards.forEach((card, index) => {
        const isEven = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isEven ? -80 : 80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        const image = card.querySelector(".project-image");
        if (image) {
          gsap.to(image, {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="03"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="project-image absolute inset-0 bg-gradient-to-br from-fg-muted/20 to-fg-muted/5 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-fg-muted/20 flex items-center justify-center">
                      <span className="font-display text-3xl text-fg-muted/40">
                        {project.id}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-fg-muted">
                      Project Image {project.id}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-accent/10 transition-opacity duration-500 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-fg/5 rounded-full text-fg-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 group-hover:text-accent transition-colors duration-300">
                  {lang === "ko" ? project.titleKo : project.title}
                </h3>

                <p className="text-lg text-fg-muted leading-relaxed mb-8">
                  {lang === "ko" ? project.descriptionKo : project.description}
                </p>

                <div className="flex items-center gap-4">
                  <MagneticButton
                    href={project.githubUrl}
                    className="group/btn px-6 py-3 border border-fg/20 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-fg hover:text-bg transition-all duration-300"
                  >
                    <Cat className="w-4 h-4 mr-2" />
                    {t("projects.cta.code")}
                  </MagneticButton>

                  <MagneticButton
                    href={project.demoUrl}
                    className="group/btn px-6 py-3 bg-fg text-bg rounded-full font-mono text-sm uppercase tracking-wider hover:bg-accent transition-all duration-300"
                  >
                    <span>{t("projects.cta.demo")}</span>
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
