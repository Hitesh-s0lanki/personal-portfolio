type Props = {
  text: string;
};

const Tags = ({ text }: Props) => {
  return (
    <p className=" border text-sm p-1 px-1 border-[#9b4819] text-[#9b4819] font-semibold rounded-sm">
      {text}
    </p>
  );
};

export default Tags;
