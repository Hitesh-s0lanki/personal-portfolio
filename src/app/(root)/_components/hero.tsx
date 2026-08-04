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
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          Hello, I am{" "}
          <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
            Hitesh Solanki
          </span>
          !
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed">
          I believe in building meaningful products through clarity, ownership,
          and strong execution. I love breaking down complex challenges,
          designing simple solutions, and using technology as a multiplier for
          business growth.
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
