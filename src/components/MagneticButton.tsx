"use client";

import { useRef, useState, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  href,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
    setIsHovered(false);
  };

  const commonProps = {
    className: `relative inline-flex items-center justify-center transition-all duration-300 ${
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
    } ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    "data-cursor": "pointer" as const,
  };

  if (disabled) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled
        {...commonProps}
      >
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      {...commonProps}
    >
      {children}
    </button>
  );
}
