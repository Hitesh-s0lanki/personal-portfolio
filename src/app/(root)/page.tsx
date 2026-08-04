import type { Metadata } from "next";
import CertificatesSection from "./_components/certificates-section";
import ExperienceSection from "./_components/experience";
import Hero from "./_components/hero";
// import ProjectSection from "./_components/project-section";
import FeaturedProjectsSection from "./_components/featured-projects-section";
import ContactSection from "./_components/contact-section";
import SkillSection from "./_components/skill-section";
// import SkillSection from "./_components/skill-section";
import JsonLd from "@/components/json-ld";
import { absoluteUrl, buildMetadata, siteConfig, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
    eyebrow: "Portfolio",
  }),
  // The home page keeps the full default title rather than the "%s | Name" template.
  title: { absolute: siteConfig.title },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: siteConfig.title,
  url: siteUrl,
  description: siteConfig.description,
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.role,
    image: absoluteUrl("/profile.png"),
    sameAs: Object.values(siteConfig.socials),
  },
};

const Home = () => {
  return (
    <div className=" min-h-screen w-full flex flex-col relative">
      <JsonLd data={profileJsonLd} />
      <Hero />
      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div>

      <ExperienceSection />
      <FeaturedProjectsSection />

      {/* <SkillSection /> */}

      {/* <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-16 lg:py-16 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div> */}

      {/* <ProjectSection /> */}

      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-16 lg:py-16 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div>

      <SkillSection />

      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-16 lg:py-16 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div>
      <CertificatesSection />

      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-16 lg:py-16 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default Home;
