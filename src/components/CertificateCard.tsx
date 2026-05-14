"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CertificateCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  certificate: any;
  language: "en" | "ko";
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export default function CertificateCard({
  certificate,
  language,
  isHovered,
  onHover,
}: CertificateCardProps) {
  return (
    <a
      href={certificate.link || certificate.image}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHover(certificate.id)}
      onMouseLeave={() => onHover(null)}
      className="
    group relative w-[340px] shrink-0
    border border-border
    bg-fg/5
    rounded-3xl
    overflow-hidden
    transition-all duration-500
    hover:border-accent
    block
  "
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={certificate.image}
          alt={language === "ko" ? certificate.title.ko : certificate.title.en}
          fill
          className="
            object-cover
            scale-100
            transition-transform duration-700
            group-hover:scale-105
          "
        />

        <div
          className={`
            absolute inset-0 bg-accent/10 transition-opacity duration-500
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted mb-2">
              {language === "ko"
                ? certificate.issuer.ko
                : certificate.issuer.en}
            </p>

            <h3 className="font-display text-2xl font-bold text-fg group-hover:text-accent transition-colors duration-300">
              {language === "ko" ? certificate.title.ko : certificate.title.en}
            </h3>
          </div>

          <div
            className="
              w-10 h-10 rounded-full
              border border-border
              flex items-center justify-center
              transition-all duration-300
              group-hover:bg-accent
              group-hover:border-accent
            "
          >
            <ArrowUpRight className="w-4 h-4 group-hover:text-bg transition-colors" />
          </div>
        </div>

        <p className="text-fg-muted leading-relaxed text-sm mb-6">
          {language === "ko"
            ? certificate.description.ko
            : certificate.description.en}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-fg-muted">
            {certificate.date}
          </span>

          {certificate.badge && (
            <span
              className="
                px-3 py-1 rounded-full
                bg-fg/5
                border border-border
                text-xs font-mono uppercase tracking-wider
                text-accent
              "
            >
              {certificate.badge}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
