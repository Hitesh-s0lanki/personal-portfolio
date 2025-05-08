import React from "react";
import CertificateCard from "./certificate-card";
import { certificates } from "@/lib/data";

const CertificatesSection: React.FC = () => {
  return (
    <section
      id="certificates"
      className=" px-5 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
      <h1 className=" text-3xl pl-1  md:text-5xl lg:text-5xl text-center md:text-center lg:text-center font-semibold ">
        Certificates
      </h1>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.name} certificate={certificate} />
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
