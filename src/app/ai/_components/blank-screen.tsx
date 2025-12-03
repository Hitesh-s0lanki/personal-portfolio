import Image from "next/image";

const BlankScreen = () => {
  return (
    <div className="flex-1 flex w-full justify-center items-center flex-col gap-6 sm:gap-8 px-4 py-40">
      <div className="relative">
        <Image
          src={"/ai.svg"}
          alt="AI"
          height={60}
          width={60}
          className="sm:h-16 sm:w-16"
        />
      </div>
      <p className="text-base sm:text-lg text-center text-slate-600">
        Ask anything about Hitesh Solanki
      </p>
    </div>
  );
};

export default BlankScreen;
