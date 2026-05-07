"use client";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import TechStack from "@/sections/TechStack";
import Projects from "@/sections/Projects";
import Awards from "@/sections/Awards";
import Contact from "@/sections/Contact";
import ClientProviders from "@/components/ClientProviders";

export default function Home() {
  return (
    <>
      <ClientProviders />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Awards />
        <Contact />
      </main>
    </>
  );
}
