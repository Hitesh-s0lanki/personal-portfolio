"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";

const Hero = () => {
  return (
    <div className=" w-full flex justify-center items-center py-20 md:py-20 lg:pt-52 fadeInDown-animation">
      <div className="w-full md:w-2/3 lg:w-2/3 flex flex-col justify-center items-center gap-5 text-center">
        <h1 className=" text-4xl md:text-5xl lg:text-5xl font-semibold">
          Hello, <span className=" text-[#9b4819]">I am Hitesh Solanki!</span>
        </h1>
        <div className="text-xl md:text-[27px] lg:text-[21px] mt-2 px-4 md:px-0 lg:px-0 space-y-2 font-semibold text-gray-600">
          <p>
            Results-driven Software Engineer with expertise in building scalable
            systems, deploying
            <br />
            cloud-native applications, and integrating AI into production-ready
            products.
          </p>
        </div>
        <div className=" flex items-center">
          <Button
            variant="ghost"
            className="px-1"
            onClick={() => {
              sendGTMEvent({
                event: "github-link-click",
                link: "github.com/Hitesh-s0lanki",
              });
            }}>
            <Link href={"https://github.com/Hitesh-s0lanki"} target="_blank">
              <Image
                src={"/social/github.svg"}
                alt="github"
                height={30}
                width={30}
              />
            </Link>
          </Button>
          <Button variant="ghost" className="px-1">
            <Link
              href={"https://www.linkedin.com/in/hitesh-solanki-a058872a0/"}
              target="_blank">
              <Image
                src={"/social/linkedin.svg"}
                alt="linkedin"
                height={30}
                width={30}
              />
            </Link>
          </Button>
          <Button variant="ghost" className="px-1">
            <Link href={"https://leetcode.com/u/hitesh4623/"} target="_blank">
              <Image
                src={"/social/leetcode.png"}
                alt="Leetcode"
                height={25}
                width={25}
              />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
