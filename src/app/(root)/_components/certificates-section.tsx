"use client";

import React from "react";
import { certificates } from "@/lib/data";
import CertificateCard from "./certificate-card";
import SectionEyebrow from "@/components/section-eyebrow";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const CertificatesSection: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section
      id="certificates"
      className="w-full flex justify-center items-center pt-5 fadeInDown-animation"
    >
      <div className="w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <SectionEyebrow>Certified &amp; Credible</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Certificates{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              I&apos;ve Earned
            </span>
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-gray-500">
            A snapshot of the courses, specializations, and credentials that
            reflect my commitment to continuous learning and engineering depth.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Award size={12} />
            <span>{certificates.length} certificates earned</span>
          </div>
        </div>

        {/* Certificate carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          {/* py-3 keeps the cards' hover lift and shadow from being clipped */}
          <CarouselContent className="py-3">
            {certificates.map((certificate) => (
              <CarouselItem
                key={certificate.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CertificateCard certificate={certificate} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:border-[#9b4819]/30 hover:text-[#9b4819] hover:shadow-md"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: snapCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === selectedIndex}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === selectedIndex
                      ? "w-5 bg-gradient-to-r from-[#f97316] to-[#9b4819]"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:border-[#9b4819]/30 hover:text-[#9b4819] hover:shadow-md"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CertificatesSection;
