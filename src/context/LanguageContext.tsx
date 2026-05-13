"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "ko";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.about": "About",
    "nav.stack": "Stack",
    "nav.work": "Work",
    "nav.awards": "Awards",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "nav.resume": "Resume",
    "hero.subtitle": "Creative Developer",
    "hero.desc":
      "Crafting premium digital experiences with cutting-edge technology and obsessive attention to detail. Based in Seoul.",
    "hero.cta.work": "View Work",
    "hero.cta.contact": "Get in Touch",
    "hero.experience": "Experience",
    "hero.years": "1+ Years",
    "about.title": "About Me",
    "about.subtitle":
      "Passionate about creating digital experiences that leave lasting impressions",
    "about.p1":
      "I'm a creative developer with a passion for building immersive web experiences that bridge the gap between design and technology. With over 1 year of experience in the industry, I've had the privilege of working with startups.",
    "about.p2":
      "My approach combines technical expertise with an eye for aesthetics. I believe that great software should not only function flawlessly but also feel intuitive and delightful to use. Every pixel matters, every interaction counts.",
    "about.p3":
      "When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or capturing moments through photography. I'm always eager to take on new challenges and push the boundaries of what's possible on the web.",
    "about.stats.projects": "Projects",
    "about.stats.experience": "Years Exp",
    "about.stats.clients": "Clients",
    "about.stats.awards": "Awards",
    "stack.title": "Tech Stack",
    "stack.subtitle":
      "A curated selection of tools and technologies I use to bring ideas to life",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend",
    "stack.tools": "Tools",
    "projects.title": "Selected Work",
    "projects.subtitle":
      "A collection of projects that showcase my expertise in building scalable, user-centric applications",
    "projects.cta.code": "Code",
    "projects.cta.demo": "Live Demo",
    "awards.title": "Recognition",
    "awards.subtitle":
      "Awards and honors that validate the quality and impact of my work",
    "contact.subtitle": "Let's Connect",
    "contact.title1": "Let's Build",
    "contact.title2": "Something",
    "contact.title3": "Together",
    "contact.cta": "Get in Touch",
    "contact.brand":
      "Creative Developer crafting premium digital experiences with modern technologies.",
    "contact.nav.title": "Navigation",
    "contact.social.title": "Social",
    "contact.backtotop": "Back to Top",
    "contact.copyright": "All rights reserved.",
    "contact.builtwith": "Built with Next.js, GSAP & lots of",
  },
  ko: {
    "nav.about": "소개",
    "nav.stack": "기술",
    "nav.work": "작업",
    "nav.awards": "수상",
    "nav.certificates": "자격증",
    "nav.contact": "연락처",
    "nav.resume": "이력서",
    "hero.subtitle": "크리에이티브 개발자",
    "hero.desc":
      "최첨단 기술과 세심한 주의력으로 프리미엄 디지털 경험을 만듭니다. 서울 기반.",
    "hero.cta.work": "작업 보기",
    "hero.cta.contact": "연락하기",
    "hero.experience": "경력",
    "hero.years": "1년+",
    "about.title": "소개",
    "about.subtitle":
      "오래도록 기억에 남는 디지털 경험을 만드는 것에 열정을 가지고 있습니다",
    "about.p1":
      "저는 디자인과 기술 사이의 간극을 메우는 몰입형 웹 경험을 구축하는 데 열정을 가진 크리에이티브 개발자입니다. 업계에서 1년 이상의 경험을 쌓으며 스타트업과 포춘 500대 기업 모두와 함께 일할 수 있는 특권을 누렸습니다.",
    "about.p2":
      "저의 접근 방식은 기술적 전문성과 미적 감각을 결합합니다. 훌륭한 소프트웨어는 완벽하게 작동할 뿐만 아니라 직관적이고 즐거워야 한다고 믿습니다. 모든 픽셀이 중요하고, 모든 상호작용이 의미 있습니다.",
    "about.p3":
      "코딩을 하지 않을 때는 새로운 디자인 트렌드를 탐구하거나 오픈소스 프로젝트에 기여하거나 사진으로 순간을 포착하는 것을 즐깁니다. 새로운 도전을 받아들이고 웹에서 가능한 것의 한계를 뛰어넘는 것을 항상 열망합니다.",
    "about.stats.projects": "프로젝트",
    "about.stats.experience": "경력",
    "about.stats.clients": "클라이언트",
    "about.stats.awards": "수상",
    "stack.title": "기술 스택",
    "stack.subtitle":
      "아이디어를 현실로 만드는 데 사용하는 엄선된 도구와 기술들",
    "stack.frontend": "프론트엔드",
    "stack.backend": "백엔드",
    "stack.tools": "도구",
    "projects.title": "선택된 작업",
    "projects.subtitle":
      "확장 가능하고 사용자 중심의 애플리케이션 구축에 대한 전문성을 보여주는 프로젝트 모음",
    "projects.cta.code": "코드",
    "projects.cta.demo": "라이브 데모",
    "awards.title": "인정",
    "awards.subtitle": "작업의 품질과 영향력을 검증하는 수상과 영예",
    "contact.subtitle": "연결하기",
    "contact.title1": "함께",
    "contact.title2": "무언가를",
    "contact.title3": "만들어요",
    "contact.cta": "연락하기",
    "contact.brand":
      "현대적인 기술로 프리미엄 디지털 경험을 만드는 크리에이티브 개발자.",
    "contact.nav.title": "내비게이션",
    "contact.social.title": "소셜",
    "contact.backtotop": "맨 위로",
    "contact.copyright": "모든 권리 보유.",
    "contact.builtwith": "Next.js, GSAP & 많은 ☕로 제작됨",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang") as Language | null;
      if (saved === "en" || saved === "ko") {
        return saved;
      }
    }
    return "en";
  });

  const toggleLang = () => {
    const newLang = lang === "en" ? "ko" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
