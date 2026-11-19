"use client";

import SectionEyebrow from "@/components/section-eyebrow";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const handleScroll = () => {
    const el = document.querySelector("#experience");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 justify-center items-center py-24 md:py-32 lg:pt-48 fadeInDown-animation">
      <SectionEyebrow>About Me</SectionEyebrow>
      <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col justify-center items-center gap-6 text-center px-6">
        {/* Title */}
        <h1 className="flex flex-col items-center gap-3 font-semibold tracking-tight text-balance">
          <span className="block bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-4xl leading-[1.1] text-transparent md:text-5xl">
            Hitesh Solanki
          </span>
          <span className="block text-2xl leading-tight md:text-3xl">
            Software Engineer &amp; AI Builder
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-gray-600 md:text-xl">
          I build AI agents, backend systems, and full-stack web apps in Mumbai,
          India. My work spans Go services, Next.js interfaces, and Python tools
          that connect language models to real products.
        </p>

        {/* CTA Button */}
        <Button size="lg" variant={"link"} onClick={handleScroll}>
          Explore My Work
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
