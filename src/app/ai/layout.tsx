type Props = {
  children: React.ReactNode;
};

const AILayout = ({ children }: Props) => {
  return (
    <div className=" min-h-screen w-full bg-[##f4f1e8] flex flex-col">
      {children}
    </div>
  );
};

export default AILayout;
