import Link from "next/link";

const Footer = () => {
  return (
    <div className=" w-full bg-[#333333] py-10 lg:px-40 text-[#FCFCFC] flex flex-col gap-5 justify-center items-center">
      <div className=" w-full flex lg:flex-row md:flex-row flex-col lg:gap-28 md:gap-28 gap-5 px-28 md:px-10 py-5 justify-center md:justify-between lg:justify-between items-center">
        <div className=" flex flex-col gap-1 text-md text-center lg:text-start md:text-start">
          <h1 className=" text-xl font-semibold">Contact Me</h1>
          <div className="flex gap-4 md:gap-5 lg:gap-5 items-center mt-1">
            <Link href="mailto:people@26ideas.com">
              hiteshsolanki@gmail.com{" "}
            </Link>
            <div className="w-[0.5px] bg-[#FCFCFC] h-4 hidden lg:flex md:flex " />
            <Link
              href="https://www.linkedin.com/in/hitesh-solanki-a058872a0/"
              target="_blank">
              LinkedIn
            </Link>
            <div className="w-[0.5px] bg-[#FCFCFC] h-4 hidden lg:flex md:flex " />
            <Link
              href="https://www.linkedin.com/in/hitesh-solanki-a058872a0/"
              target="_blank">
              9004713782
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[0.25px] bg-[#FCFCFC] w-full " />
      <div className=" w-full text-center flex flex-wrap  items-center justify-center py-5 gap-4 px-5 lg:px-0 md:px-0">
        <p>© Copyright 2024 - Hitesh Solanki.</p>
      </div>
    </div>
  );
};

export default Footer;
