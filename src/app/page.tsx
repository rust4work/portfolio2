"use client";

// Test each import one by one
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import TechStack from "@/sections/TechStack";
import Projects from "@/sections/Projects";
import Awards from "@/sections/Awards";
import Contact from "@/sections/Contact";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Awards />
        <Contact />
      </main>
    </div>
  );
}
