import React from "react";
import { certificates } from "@/lib/data";
import CertificateCard from "./certificate-card";
import { Award } from "lucide-react";

const CertificatesSection: React.FC = () => {
  return (
    <section
      id="certificates"
      className="w-full flex justify-center items-center pt-5 bg-gradient-to-b from-white via-slate-50/80 to-white fadeInDown-animation"
    >
      <div className="w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
            <Award className="h-3 w-3" />
            <span>Certified &amp; Credible</span>
          </div>
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

        {/* Certificate grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
