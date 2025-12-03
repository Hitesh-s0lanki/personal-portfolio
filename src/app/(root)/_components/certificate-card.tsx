import Image from "next/image";
import { Certificate } from "@/type";
import { Badge } from "@/components/ui/badge";

type Props = {
  certificate: Certificate;
};

const CertificateCard = ({ certificate }: Props) => {
  return (
    <div className=" w-full rounded-md group cursor-pointer border shadow-sm flex flex-col">
      <div className=" w-full relative transition-all duration-1000">
        <Image
          src={certificate.image}
          alt="Frame"
          height={400}
          width={400}
          className="w-full rounded-t-md"
        />
      </div>
      <div className=" py-3 px-3 flex flex-col justify-start items-start  gap-4">
        <div className="flex  flex-col gap-4">
          <div className=" flex flex-col gap-1">
            <h1 className=" text-lg font-semibold">{certificate.name}</h1>
            <p className=" text-xs text-[#4F4F4F]">
              Issued by {certificate.issuer}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.category.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
