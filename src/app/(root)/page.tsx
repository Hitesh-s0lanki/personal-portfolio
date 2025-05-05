// import HomeDescription from "@/components/home/home-description";
// import SocialCard from "@/components/home/social-cards";
// import TabView from "@/components/home/tab-view";

import CertificatesSection from "./_components/certificates-section";
import ExperienceSeciton from "./_components/experience-card";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import ProjectSection from "./_components/project-section";
import SkillSection from "./_components/skill-section";

const Home = () => {
  return (
    <div className=" min-h-screen w-full bg-[##f4f1e8] flex flex-col">
      <Navbar />
      <Hero />
      <div className=" px-5 md:px-10 lg:px-40 py-5 md:py-20 lg:py-20 w-full flex flex-col gap-10 md:gap-20 lg:gap-20 fadeInDown-animation">
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

      <ProjectSection />
      <ExperienceSeciton />
      <CertificatesSection />
      <Footer />
    </div>
  );
};

export default Home;
