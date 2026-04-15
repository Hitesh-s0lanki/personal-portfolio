import Image from "next/image";
import { Certificate } from "@/type";
import { GraduationCap, CalendarDays } from "lucide-react";

type Props = {
  certificate: Certificate;
};

const CertificateCard = ({ certificate }: Props) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b4819]/20 hover:shadow-xl hover:shadow-[#9b4819]/8 cursor-default">
      {/* Certificate image area */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <Image
          src={certificate.image}
          alt={certificate.name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Year badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 border border-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600 shadow-sm backdrop-blur-sm">
          <CalendarDays size={10} />
          {certificate.date}
        </div>
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#9b4819]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Issuer pill */}
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/70 bg-orange-50 px-2.5 py-1 text-[10px] font-medium text-[#9b4819]">
          <GraduationCap size={11} />
          {certificate.issuer}
        </div>

        {/* Certificate name */}
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors duration-200 group-hover:text-[#9b4819]">
          {certificate.name}
        </h3>

        {/* Category tags */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {certificate.category.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
          {certificate.category.length > 5 && (
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-gray-400">
              +{certificate.category.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
