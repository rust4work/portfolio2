"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cat, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import dacooka from "../../public/projects/dacooka.png";
import utown from "../../public/projects/utown.png";
import movie from "../../public/projects/movie.png";
import blog from "../../public/projects/blog.png";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Smart Recipe Companion",
    titleKo: "스마트 레시피 컴패니언",
    description:
      "DaCooka is a modern, AI-powered culinary assistant designed to solve the 'what is for dinner?' dilemma. By leveraging the Spoonacular API, it helps users find recipes based on what they already have in their pantry or strictly fit their nutritional goals.",
    descriptionKo:
      "DaCooka는 '오늘 저녁은 뭐 먹지?'라는 고민을 해결하기 위해 설계된 최첨단 AI 기반 요리 도우미입니다. Spoonacular API를 활용하여 사용자가 이미 가지고 있는 재료를 기반으로 하거나 영양 목표에 정확히 부합하는 레시피를 찾아줍니다..",
    image: dacooka,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Spoonacular API"],
    githubUrl: "https://github.com/rust4work/dacooka",
    demoUrl: "https://dacooka.vercel.app/",
  },
  {
    id: 2,
    title: "Modern Food Delivery & Service Marketplace",
    titleKo: "현대적인 음식 배달 및 서비스 마켓플레이스",
    description:
      "UTown is a comprehensive frontend application designed to handle complex user flows for three distinct roles Clients (Customers), Restaurateurs (Vendors) Admins",
    descriptionKo:
      "UTown은 고객, 레스토랑 운영자, 관리자라는 세 가지 역할에 대한 복잡한 사용자 흐름을 처리하도록 설계된 종합적인 프런트엔드 애플리케이션입니다.",
    image: utown,
    tags: ["React", "TypeScript", "Vite", "SASS", "AntDesign"],
    githubUrl: "https://github.com/rust4work/utown",
    demoUrl: "/",
    comingSoon: true,
  },
  {
    id: 3,
    title: "Movie Discovery App",
    titleKo: "영화 발견 앱",
    description:
      "A high-performance movie search application that interfaces with the TMDB API to provide real-time movie searching, rating functionality, and top-rated lists, all wrapped in a responsive, polished UI.",
    descriptionKo:
      "고성능 영화 검색 애플리케이션으로, TMDB API와 연동하여 실시간 영화 검색, 평점 기능, 최고 평점 목록 등을 제공하며, 반응형의 세련된 사용자 인터페이스를 갖추고 있습니다.",
    image: movie,
    tags: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/rust4work/movie-app",
    demoUrl: "https://movie-app-one-mu-47.vercel.app/",
  },
  {
    id: 4,
    title: "React Blog Platform",
    titleKo: "리액트 블로그 플랫폼",
    description:
      "A modern, full-featured blog application capable of handling user authentication, article management (CRUD), and dynamic feed pagination. Built to demonstrate proficiency in core React concepts and component-based architecture.",
    descriptionKo:
      "사용자 인증, 게시글 관리(CRUD), 동적 피드 페이지네이션 기능을 갖춘 최신형 블로그 애플리케이션입니다. 핵심 React 개념과 컴포넌트 기반 아키텍처에 대한 숙련도를 보여주기 위해 개발되었습니다.",
    image: blog,
    tags: ["TypeScript", "Vite", "SCSS", "ESlint"],
    githubUrl: "https://github.com/rust4work/blog-platform",
    demoUrl: "https://blog-platform-five-red.vercel.app/",
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
                <div className="project-image absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <NextImage
                    src={project.image}
                    alt={lang === "ko" ? project.titleKo : project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                    priority={index < 2}
                  />
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
                    disabled={project.comingSoon}
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
