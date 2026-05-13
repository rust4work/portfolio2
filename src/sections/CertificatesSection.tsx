"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import SectionHeader from "@/components/SectionHeader";
import CertificateCard from "@/components/CertificateCard";
import { useLanguage } from "@/context/LanguageContext";

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
    id: "aws-saa",
    title: {
      en: "AWS Solutions Architect Associate",
      ko: "AWS 솔루션스 아키텍트 어소시에이트",
    },
    issuer: {
      en: "Amazon Web Services",
      ko: "아마존 웹 서비스",
    },
    date: "2024.03",
    description: {
      en: "Validates expertise in designing distributed systems on AWS infrastructure.",
      ko: "AWS 인프라에서 분산 시스템 설계 전문성을 검증합니다.",
    },
    image: "/certs/aws-saa.png",
    badge: "Active",
  },
  {
    id: "ckad",
    title: {
      en: "CKAD: Certified Kubernetes Application Developer",
      ko: "CKAD: 쿠버네티스 애플리케이션 개발자 인증",
    },
    issuer: {
      en: "Cloud Native Computing Foundation",
      ko: "클라우드 네이티브 컴퓨팅 재단",
    },
    date: "2024.01",
    description: {
      en: "Demonstrates skills in designing, building, and deploying cloud-native applications.",
      ko: "클라우드 네이티브 애플리케이션 설계, 구축 및 배포 능력을 입증합니다.",
    },
    image: "/certs/ckad.png",
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

  const duplicatedCertificates = [
    ...certificates,
    ...certificates,
    ...certificates,
  ];

  useEffect(() => {
    if (!trackRef.current || certificates.length === 0) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 3;

    animationRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
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
