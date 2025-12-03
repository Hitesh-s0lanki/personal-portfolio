import React from "react";
import { certificates } from "@/lib/data";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const CertificatesSection: React.FC = () => {
  const testimonials = certificates.map((certificate) => ({
    quote: certificate.issuer,
    name: certificate.name,
    tags: certificate.category,
    src: certificate.image,
  }));

  return (
    <section
      id="certificates"
      className="w-full flex justify-center items-center pt-5 bg-gradient-to-b from-white via-slate-50 to-white fadeInDown-animation"
    >
      <div className="w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
            <span>Certified & Credible</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Certificates{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              I’ve Earned
            </span>
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-gray-600">
            A snapshot of the courses, specializations, and credentials that
            reflect my commitment to continuous learning and engineering depth.
          </p>
        </div>

        {/* Grid of certificates */}
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default CertificatesSection;
