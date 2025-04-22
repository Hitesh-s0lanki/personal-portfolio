import { ExternalLink, Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SocialCard = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-2">
        <div className=" col-span-2 w-full p-4 bg-[#143061] rounded-2xl space-y-4">
          <div className=" w-full flex justify-between items-start">
            <Mail className="text-white size-10" />
            <Link href="mailto:hiteshsolanki4623@gmail.com">
              <ExternalLink className="text-white size-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-white text-sm font-semibold">Email</h1>
            <p className="text-white text-xs flex flex-wrap w-full text-wrap">
              hiteshsolanki4623@gmail.com
            </p>
          </div>
        </div>
        <div className="w-full p-4 bg-[linear-gradient(180deg,#35A5EE,#1264D6)] rounded-2xl space-y-4">
          <div className=" w-full flex justify-between items-start">
            <Image
              src="/social/leetcode.png"
              alt="leetcode"
              height={50}
              width={50}
              className="text-white size-10"
            />
            <Link href="https://leetcode.com/u/hitesh4623/" target="_blank">
              <ExternalLink className="text-white size-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-white text-sm font-semibold">Leetcode</h1>
            <p className="text-white text-xs flex flex-wrap w-full text-wrap">
              @hitesh4623
            </p>
          </div>
        </div>
        <div className=" col-span-3 w-full p-4 bg-[linear-gradient(180deg,#25262F,#0C0D16)] rounded-2xl space-y-4">
          <div className=" w-full flex justify-between items-start">
            <Github className="text-white size-10" />
            <Link href="https://github.com/Hitesh-s0lanki" target="_blank">
              <ExternalLink className="text-white size-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-white text-sm font-semibold">Github</h1>
            <p className="text-white text-xs flex flex-wrap w-full text-wrap">
              @hitesh-s0lanki
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
