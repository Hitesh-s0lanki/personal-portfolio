import CertificatesSection from "./_components/certificates-section";
import ExperienceSeciton from "./_components/experience-card";
import Hero from "./_components/hero";
// import ProjectSection from "./_components/project-section";
import FeaturedProjectsSection from "./_components/featured-projects-section";
import ContactSection from "./_components/contact-section";
import SkillSection from "./_components/skill-section";
// import SkillSection from "./_components/skill-section";

const Home = () => {
  return (
    <div className=" min-h-screen w-full bg-[##f4f1e8] flex flex-col relative">
      <Hero />
      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
        <div className="w-full  pt-10 lg:pt-28 md:pt-28">
          <div className="h-[0.5px] bg-[#BDBDBD] w-full " />
        </div>
      </div>

      <ExperienceSeciton />
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
