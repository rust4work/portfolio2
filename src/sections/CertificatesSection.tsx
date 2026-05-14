"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/SectionHeader";
import CertificateCard from "@/components/CertificateCard";
import { useLanguage } from "@/context/LanguageContext";
import habsida from "../../public/certificates/habsida.png";

interface Certificate {
  id: string;
  title: {
    en: string;
    ko: string;
  };
  issuer: {
    en: string;
    ko: string;
  };
  date: string;
  description: {
    en: string;
    ko: string;
  };
  image: string;
  link?: string;
  badge?: string;
}

const certificates: Certificate[] = [
  {
    id: "habsida",
    title: {
      en: "Habsida Frontend Developer Certification",
      ko: "Habsida 프론트엔드 개발자 인증",
    },
    issuer: {
      en: "Habsida",
      ko: "Habsida",
    },
    date: "2026.01",
    description: {
      en: "Completed an intensive frontend development program focused on modern web technologies, responsive UI implementation, and real-world project development.",
      ko: "Habsida에서 제공하는 프론트엔드 개발자 교육 프로그램을 완료했습니다.",
    },
    image: "/certificates/habsida.png",
    link: "/certificates/habsida.png",
    badge: "Active",
  },
  {
    id: "ielts",
    title: {
      en: "IELTS: International English Language Testing System",
      ko: "IELTS: 국제 영어 능력 시험",
    },
    issuer: {
      en: "British Council",
      ko: "브리티시 컨설팅",
    },
    date: "2022.11",
    description: {
      en: "Achieved an overall band score of 6, demonstrating advanced English proficiency in listening, reading, writing, and speaking.",
      ko: "브리티시 컨설팅에서 제공하는 국제 영어 능력 시험을 통과했습니다.",
    },
    image: "/certificates/ielts.png",
    link: "/certificates/ielts.png",
  },
  {
    id: "topik",
    title: {
      en: "TOPIK: Test of Proficiency in Korean",
      ko: "TOPIK: 한국어 능력 시험",
    },
    issuer: {
      en: "National Institute for International Education",
      ko: "국립국제교육원장",
    },
    date: "2025.03",
    description: {
      en: "Achieved an overall band score of 4, demonstrating advanced Korean proficiency in listening, reading, writing, and speaking.",
      ko: "국립국제교육원장에서 제공하는 한국어 능력 시험을 통과했습니다.",
    },
    image: "/certificates/topik.jpg",
    link: "/certificates/topik.jpg",
  },
  {
    id: "4level",
    title: {
      en: "SNU Certificate of completion of 4th level Korean",
      ko: "SNU 4단계 한국어 수료증",
    },
    issuer: {
      en: "SNU Language Education Institute",
      ko: "서울대학교 언어교육원장",
    },
    date: "2024.08",
    description: {
      en: "Completed the 4th level Korean language course at SNU Language Education Institute, demonstrating advanced proficiency in Korean language skills.",
      ko: "서울대학교 언어교육원 한국어 4급 과정을 수료하여 한국어 고급 기량을 입증했습니다.",
    },
    image: "/certificates/4level.jpg",
    link: "/certificates/4level.jpg",
  },
  {
    id: "performance",
    title: {
      en: "Certificate of Outstanding Performance in SNU  Korean Course",
      ko: "서울대학교 한국어 과정 우수 수료증",
    },
    issuer: {
      en: "SNU Language Education Institute",
      ko: "서울대학교 언어교육원장",
    },
    date: "2024.02",
    description: {
      en: "Certificate awarded for outstanding performance in the SNU Korean language course, demonstrating exceptional dedication and proficiency in Korean language skills and Korean culture.",
      ko: "서울대학교 한국어 과정에서 탁월한 성적을 거두어 한국어 능력과 한국 문화에 대한 뛰어난 헌신과 숙련도를 인정받아 수여된 증서입니다.",
    },
    image: "/certificates/performance.jpg",
    link: "/certificates/performance.jpg",
  },
  {
    id: "attendance",
    title: {
      en: "Certificate of Perfect Attendance in SNU  Korean Course",
      ko: "서울대학교 한국어 과정 출석 완료증",
    },
    issuer: {
      en: "SNU Language Education Institute",
      ko: "서울대학교 언어교육원장",
    },
    date: "2024.02",
    description: {
      en: "Certificate awarded for perfect attendance in the SNU Korean language course, demonstrating consistent commitment and engagement in Korean language learning.",
      ko: "서울대학교 한국어 과정에서 완벽한 출석 기록을 달성하여 한국어 학습에 대한 지속적인 헌신과 참여를 인정받아 수여된 증서입니다.",
    },
    image: "/certificates/attendance.jpg",
    link: "/certificates/attendance.jpg",
  },
];

export default function CertificatesSection({
  className = "",
}: {
  className?: string;
}) {
  const { lang } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedCertificates = [...certificates, ...certificates];

  useEffect(() => {
    if (!trackRef.current || certificates.length === 0) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    animationRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!animationRef.current) return;

    if (hoveredId) {
      animationRef.current.pause();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPaused(true);
    } else {
      animationRef.current.resume();
      setIsPaused(false);
    }
  }, [hoveredId]);

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const title = lang === "en" ? "Certificates" : "자격증";

  const subtitle =
    lang === "en"
      ? "Professional certifications and achievements"
      : "전문 자격증 및 수상 이력";

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className={`relative py-32 md:py-40 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeader number="05" title={title} subtitle={subtitle} />

        <div
          className={`
            mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full
            border border-border bg-fg/5
            transition-all duration-300
            ${isPaused ? "text-accent" : "text-fg-muted"}
          `}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isPaused ? "bg-accent" : "bg-fg-muted"
            }`}
          />

          <span className="text-xs font-mono uppercase tracking-wider">
            {isPaused
              ? lang === "en"
                ? "Paused"
                : "일시정지"
              : lang === "en"
                ? "Auto-scrolling"
                : "자동 스크롤"}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6"
            style={{ willChange: "transform" }}
          >
            {duplicatedCertificates.map((cert, index) => (
              <CertificateCard
                key={`${cert.id}-${index}`}
                certificate={cert}
                language={lang}
                isHovered={hoveredId === cert.id}
                onHover={handleHover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
