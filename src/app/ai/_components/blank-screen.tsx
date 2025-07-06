import Image from "next/image";

const BlankScreen = () => {
  return (
    <div className=" flex-1 flex w-full md:w-1/3 lg:w-1/3 justify-center items-center flex-col gap-8">
      <Image src={"/ai.svg"} alt="AI" height={60} width={60} />
      <p className="text-lg">Ask anything about me</p>
    </div>
  );
};

export default BlankScreen;
