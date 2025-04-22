import Image from "next/image";

const HomeDescription = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#2F3D59,#0B1326)] shadow-2xl drop-shadow-2xl rounded-4xl flex flex-col gap-5 justify-center items-center p-5 py-10 mt-[100px]">
      <div
        className="
    w-[200px] h-[200px]
   bg-[linear-gradient(180deg,#142131,#000113)]
     rounded-4xl  absolute -top-20 z-1
  "
      >
        {/* Make this cricle lighter */}

        <div
          className="
                w-full h-full rounded-4xl
                bg-[radial-gradient(circle_at_top_left,rgba(242,84,91,0.25),transparent_60%)]
                p-3
              "
        >
          <Image
            src="/profile.png"
            alt="Hitesh Solanki"
            width={200}
            height={200}
            className=" rounded-4xl "
          />
        </div>
      </div>
      <div className="h-[80px]"></div>
      <div className=" text-center">
        <h1 className=" text-2xl text-white font-semibold">Hitesh Solanki</h1>
        <h3 className="text-sm text-muted-foreground">@hitesh-s0lanki</h3>
      </div>
      <div className="flex flex-col gap-2 text-white text-sm text-start">
        <p>🎈04.06.2003</p>
        <p>📍Mumbai, India</p>
        <p>💻Software Engineer | Builder</p>
      </div>
    </div>
  );
};

export default HomeDescription;
