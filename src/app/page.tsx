import HomeDescription from "@/components/home/home-description";
import SocialCard from "@/components/home/social-cards";

const Home = () => {
  return (
    <div
      className="
    w-full h-screen
   bg-[linear-gradient(180deg,#142131,#000113)]
    bg-cover
  "
    >
      <div className="w-full h-screen bg-[radial-gradient(circle_at_top_left,rgba(242,84,91,0.3),transparent_60%)]">
        <div
          className="w-full h-screen bg-[radial-gradient(circle_at_bottom,rgba(63,2,95,0.5),transparent_70%)] 
      bg-blend-overlay p-5 flex items-center flex-col gap-5"
        >
          <HomeDescription />
          <SocialCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
