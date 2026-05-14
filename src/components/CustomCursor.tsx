"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      cursor.style.display = "none";
      dot.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText);
      }
    };

    const onMouseLeaveLink = () => {
      setIsHovering(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", onMouseMove);

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], [data-cursor-text]',
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
      return interactiveElements;
    };

    let elements = attachListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      elements = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-[width,height] duration-300 ${
          isHovering ? "w-15 h-15" : "w-8 h-8"
        } -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}
      >
        <div
          className={`w-full h-full rounded-full border border-white transition-all duration-300 ${
            isHovering ? "bg-white/10 scale-100" : "bg-transparent scale-100"
          }`}
        />
        {cursorText && (
          <span className="absolute text-white text-xs font-mono uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
